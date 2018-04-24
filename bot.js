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
        for (i = 0; i < defaultChannels.length; i++){
            for (a = 0; a < defaultChannels[i].length; a++) {
                console.log('defaultChannels: ' + defaultChannels[i][a])
                if (!channels[i]) channels[i] = []
                channels[i][a] = guild.channels.find("name", defaultChannels[i][a]);
                console.log('channels: ' + channels[i][a]);
            }
        }
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (oldMember.voiceChannel == null && newMember.voiceChannel != null) {
        var categoryChannels = newMember.voiceChannel.parent.children.toArray();
        var emptyChannels = [];
        for (i = 0; i < categoryChannels; i++) {
            if (categoryChannels[i].members == null) {
                emptyChannels.push(categoryChannels[i]);
            }
        }
        if (emptyChannels.length == 0) {
            categoryChannels[categoryChannels.length].clone(categoryChannels[categoryChannels.length].name.substring(0, categoryChannels[categoryChannels.length].name.lastIndexOf(" ")) + (parseInt(categoryChannels[categoryChannels.length].name.split().pop()) + 1).toString());
        }
    } else if (oldMember.voiceChannel != null && newMember.voiceChannel == null) {
        
    } else {

    }
});