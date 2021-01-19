const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs')

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready!');
    client.user.setActivity(`music | ${prefix}play`,  { type: "LISTENING" });
});

client.login(token);

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general-mazhor');
    if (!channel) return;
    channel.send(`nahuy prishol ${member}`);
});

client.on('message', message => {
    if (message.content.toLowerCase() === '!whoami') {
        const embed = new MessageEmbed()
            .setTitle(`about ${message.author.username}`)
            .setColor(0xff0000)
            .setAuthor(message.author.username)
            .setDescription('faggot');
        message.channel.send(embed);
    }
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        });

        message.channel.send(avatarList);
    }
});

client.on('message', message => {

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (message.author.username === 'isymfc')
        if (command === 'kick') {
            const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.kick('kk')
                        .then(() => {
                            message.reply(`Successfully kicked ${user.username}`);
                        })
                        .catch(err => {
                            message.reply(`I was unable to kick ${user}`);
                            console.error(err);
                        });
                } else {
                    message.reply('You are not Ruslan')
                }
            } else {
                message.reply('You did not mention the user to kick');
            }
        }
});

