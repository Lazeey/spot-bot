const Discord = require('discord.js');
const axios = require('axios');

require('dotenv').config();

function sortPokeStats(stats) {
    return (stats.map(stat => {
        return ({ name: `${(stat.stat.name).toUpperCase()}`, value: "```"+ stat.base_stat +"```", inline: true })
    }))
}

module.exports = (message, args) => {
    axios({
        method: 'get',
        url: `https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`
    })
        .then((response) => {
            var pokeAbilities = response.data.abilities;
            var pokeStats = response.data.stats;
            var pokeImage = response.data.sprites.front_default;
            var finalArray = [];
            finalArray.push({ name: `STATS`, value: "================================", inline: false })
            pokeStats.map(stat => {
                finalArray.push({ name: `${(stat.stat.name).toUpperCase()}`, value: "```"+ stat.base_stat +"```", inline: true });
            })
            finalArray.push({ name: `ABILITIES`, value: "================================", inline: false })
            pokeAbilities.map(ability => {
                finalArray.push({ name: `${(ability.ability.name).toUpperCase()}`, value: "```"+ (ability.ability.is_hidden ? "Hidden" : "No Hidden") +"```", inline: true })
            })
            const embed = new Discord.MessageEmbed()
                .setColor("#2f3136")
                .setURL(`https://localhost:3000/`)
                .addFields(
                    finalArray.map((item) => {
                        return item
                    })
                )
                .setThumbnail(pokeImage)
            message.channel.send(embed);
        })
        .catch((error) => {
            message.channel.send("Pokemon não encontrado.",{files: [`https://http.cat/${error.response.status}.png`]});
        });
}