const Discord = require('discord.js');
const axios = require('axios');

require('dotenv').config();

module.exports = (message, args) => {
    axios({
        method: 'get',
        url: `https://dog.ceo/api/breeds/image/random`
    })
        .then((response) => {
            var dog = response.data
            if (dog) {
                const embed = new Discord.MessageEmbed()
                    .setColor("#2f3136")
                    .setImage(dog.message)
                    message.channel.send(embed);
            }
            
        })
        .catch((error) => {
            message.channel.send("Eita, não encontrei nenhum doguinho, mas fica com um gatinho.",{files: [`https://http.cat/${error.response.status}.png`]});
        });
}