const Discord = require('discord.js');
const axios = require('axios');

require('dotenv').config();

module.exports = (message, args) => {
    axios({
        method: 'get',
        url: `https://api.thecatapi.com/v1/images/search`
    })
        .then((response) => {
            var cat = response.data[0]
            if (cat) {
                const embed = new Discord.MessageEmbed()
                    .setColor("#2f3136")
                    .setImage(cat.url)
                    message.channel.send(embed);
            }
            
        })
        .catch((error) => {
            message.channel.send("Usuário não encontrado.",{files: [`https://http.cat/${error.response.status}.png`]});
        });
}