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

var categoryChannels;

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (oldMember.voiceChannel == null && newMember.voiceChannel != null) {
        categoryChannels = newMember.voiceChannel.parent.children.array();
        var emptyChannels = [];
        for (i = 0; i < categoryChannels.length; i++) {
            if (categoryChannels[i].members.array()[0] == undefined) {
                emptyChannels.push(categoryChannels[i]);
            }
        }
        if (emptyChannels.length == 0) {
            var permissions = categoryChannels[0].permissionOverwrites.array();
            categoryChannels[categoryChannels.length - 1].clone(categoryChannels[categoryChannels.length - 1].name.substring(0, categoryChannels[categoryChannels.length - 1].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[categoryChannels.length - 1].name.split(" ").pop()) + 1).toString()).then(clone => {
                clone.setParent(categoryChannels[categoryChannels.length - 1].parent);
                for (i = 0; i < permissions.length; i++) {
                    clone.overwritePermissions(permissions[i].id, permissions[i]);
                }
            });
        }
    } else if (oldMember.voiceChannel != null && newMember.voiceChannel == null) {
        categoryChannels = oldMember.voiceChannel.parent.children.array();
        var emptyChannels = [];
        for (i = 0; i < categoryChannels.length; i++) {
            if (categoryChannels[i].members.array()[0] == undefined) {
                emptyChannels.push(categoryChannels[i]);
            }
        }
        if (emptyChannels.length >= 2) {
            for (i = 0; i <= emptyChannels.length - 1; i++) {
                emptyChannels[emptyChannels.length - i].delete();
            }
            for (i = 0; i < categoryChannels.length; i++) {

            }
        }
    } else {

    }
});