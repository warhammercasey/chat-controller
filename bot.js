const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config');
client.login(process.env.BOT_TOKEN);

var firstMessage = true;
var defaultChannels = [[]];

var channels = [[]];
var guild;

client.on('ready', () => {
    console.log('Ready');
    defaultChannels = config.channels.slice();
});

client.on('message', message => {
    if (firstMessage) {
        firstMessage = false;
        guild = message.guild;
        console.log('channels: ' + channels[0][0]);
        for (i = 0; i < defaultChannels.length; i++){
            for (a = 0; a < defaultChannels[i].length; a++) {
                channels[i][a] = guild.channels.find("name", defaultChannels[i][a]);
            }
        }
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (oldMember.voiceChannel == null && newMember.voiceChannel != null) {
        
    } else if (oldMember.voiceChannel != null && newMember.voiceChannel == null) {
        
    } else {

    }
});