const Discord = require('discord.js');
const client = new Discord.Client();
const CommandsController = require('./Controllers/CommandController')

require('dotenv').config()

client.on('ready', () => {
    console.log("running");
});

client.on('message', message => {
    CommandsController(message)
});

client.login(process.env.DISCORD_TOKEN);