
const axios = require('axios');
const Discord = require('discord.js');
module.exports = (message, args) => {

    var started = new Date().getTime();

    axios({
        method: 'get',
        url: `https://discord.com/`
    })
        .then((response) => {
            var ended = new Date().getTime();
            var milliseconds = ended - started;

            const embed = new Discord.MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`**${milliseconds} ms**`)
            message.channel.send(embed);

        })
        .catch((error) => {
            console.log(error)
        });
}