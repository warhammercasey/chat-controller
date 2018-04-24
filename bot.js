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
        var categoryChannels = newMember.voiceChannel.parent.children;
        var emptyChannels = [];
        for (i = 0; i < categoryChannels.length; i++) {
            if (categoryChannels[i].members.array()[0] == undefined) {
                emptyChannels.push(categoryChannels[i]);
                console.log('Empty channel');
            }
        }
        if (emptyChannels.length == 0) {
            categoryChannels.array()[categoryChannels.array().length-1].clone(categoryChannels.array()[categoryChannels.array().length-1].name.substring(0, categoryChannels.array()[categoryChannels.array().length-1].name.lastIndexOf(" ")) + (parseInt(categoryChannels.array()[categoryChannels.array().length-1].name.split().pop()) + 1).toString()).then(clone => clone.setParent(categoryChannels.array()[categoryChannels.array().length-1].parent));
        }
    } else if (oldMember.voiceChannel != null && newMember.voiceChannel == null) {
        
    } else {

    }
});