const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const prefix = "!cumbot ";
const slaps = [
    "./resources/slap.gif",
    "./resources/slap2.gif"
];

client.on("message", message => {
    if (message.author.bot) return;
    if (message.author.username === "Vsionarii" || message.author.username === "vsionarii") {
        message.reply("SHUT THE FUCK UP CHRIS");
    }
    if (message.author.username === "itsme") {
        if (message.content[1] == ":") {
            return;
        }
        let returnMessage = "";
        for (let i = 0; i < message.content.length; i++) {
            if (Math.random() > 0.5) {
                returnMessage += message.content[i].toUpperCase();
            } else {
                returnMessage += message.content[i].toLowerCase();
            }
        }
        message.reply(returnMessage);
    }
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "hello") {
        message.reply("hello " + message.author.username)
    } else if (command == "cheer") {
        message.reply("I love you <3")
    } else if (command == "am") {
        if (args[0] === "I" && args[1] === "a" && args[2] === "good") {
            if (message.author.username === "Yujivie") {
                message.reply("You're the best girl <3");
            } else if (message.author.username === "tripledoublem9") {
                message.reply("Come back when you're a doctor");
            }
        }
    } else if (command === "img") {
        message.channel.send({files: ["./resources/harry.JPG"]});
    } else if (command === "slap") {
        let index = Math.floor(Math.random() * slaps.length);
        message.channel.send({files: [slaps[index]]});
    }
});

client.login(config.BOT_TOKEN);
