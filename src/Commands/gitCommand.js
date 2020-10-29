const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();

module.exports = (message, args) => {
    
    axios({
        method: 'get',
        url: `https://api.github.com/users/${args[0]}?client_id=${process.env.GITHUB_TOKEN}`
    })
        .then((response) => {
            var userInfo = response.data
            const embed = new Discord.MessageEmbed()
                .setTitle(`**${userInfo.name}**`)
                .setColor("#2f3136")
                .setURL(userInfo.html_url)
                .addFields(
                    { name: ':speech_balloon: Bio', value: (userInfo.bio !== null || undefined ? userInfo.bio : "" ), inline: false },
                    
                    { name: ':crown: **Seguidores**', value: userInfo.followers, inline: true },
                    { name: ':busts_in_silhouette: **Seguindo**', value: userInfo.following, inline: true },
                    { name: ':date: **Conta criada há**', value: userInfo.created_at, inline: true },
                    
                    { name: ':earth_americas: **Região**', value: userInfo.location, inline: true }
                )
                .setThumbnail(userInfo.avatar_url)
            message.channel.send(embed)
        })
        .catch((error) => {
            if (error) {
                message.channel.send("Usuário não encontrado.");
            }
        });
}