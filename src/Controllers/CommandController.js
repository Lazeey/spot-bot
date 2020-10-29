const Discord = require('discord.js');

const pingCommand = require('../Commands/pingCommand.js')
const gitRepoCommand = require('../Commands/gitRepoCommand.js')
const gitCommand = require('../Commands/gitCommand.js')
const pokeCommand = require('../Commands/pokeCommand.js');
const dogCommand = require('../Commands/dogCommand.js');
const catCommand = require('../Commands/catCommand.js');

var botPrefix = "."

module.exports = message => {
    const args = message.content.slice(botPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    switch (command) {
        case "ping":
            pingCommand(message,args);
            break;
        case "git":
            gitCommand(message,args);
            break;
        case "gitrepos":
            gitRepoCommand(message,args);
            break;
        case "poke":
            pokeCommand(message,args)
            break;
        case "dog":
            dogCommand(message)
            break;
        case "cat":
            catCommand(message)
            break;
    }
};