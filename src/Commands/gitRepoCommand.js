const Discord = require('discord.js');
const axios = require('axios');

require('dotenv').config();

module.exports = (message, args) => {
    axios({
        method: 'get',
        url: `https://api.github.com/users/${args[0]}/repos?client_id=${process.env.GITHUB_TOKEN}`
    })
        .then((response) => {
            var userRepos = response.data
            if (userRepos) {
                userRepos.sort((a,b) => {
                    return b.stargazers_count - a.stargazers_count
                })
                const embed = new Discord.MessageEmbed()
                    .setTitle(`**${args[0]} repositories**`)
                    .setColor("#2f3136")
                    .setURL(`https://github.com/${args[0]}?tab=repositories`)
                    .addFields(
                        userRepos.map(repo => {
                            return { name: `${repo.archived ? ":scroll: | ": ":page_with_curl: | "} ${repo.name}`, value: "```"+`   ${(repo.description !== null || undefined ? repo.description : "Nenhuma")}`+" ```" + `${((repo.forks > 0 && repo.forks !== null || undefined) ? "**Forks:** "+repo.forks : "" )} ${((repo.stargazers_count > 0 && repo.stargazers_count !== null || undefined) ? " **Stars:** "+repo.stargazers_count : "" )} ${(repo.license !== null || undefined ? " **License:** "+repo.license.name : "")}`, inline: false }
                        })
                    )
                    .setThumbnail(userRepos[0].owner.avatar_url)
                    message.channel.send(embed);
            }
            
        })
        .catch((error) => {
            message.channel.send("Usuário não encontrado.");
        });
}