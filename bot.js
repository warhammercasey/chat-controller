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
        console.log(categoryChannels.array().length);
        for (i = 0; i < categoryChannels.array().length; i++) {
            if (categoryChannels.array()[i].members.array()[0] == undefined) {
                emptyChannels.push(categoryChannels.array()[i]);
            }
        }
        console.log(emptyChannels.length);
        if (emptyChannels.length == 0) {
            var permissions = categoryChannels.array()[0].permissionOverwrites.array();
            categoryChannels.array()[categoryChannels.array().length - 1].clone(categoryChannels.array()[categoryChannels.array().length - 1].name.substring(0, categoryChannels.array()[categoryChannels.array().length - 1].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels.array()[categoryChannels.array().length - 1].name.split(" ").pop()) + 1).toString()).then(clone => {
                clone.setParent(categoryChannels.array()[categoryChannels.array().length - 1].parent);
                clone.setUserLimit(categoryChannels.array()[categoryChannels.array().length - 1].userLimit);
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
        if (emptyChannels.length > 1) {
            for (i = 0; i < emptyChannels.length - 1; i++) {
                emptyChannels[emptyChannels.length - i - 1].delete();
            }
            for (i = 0; i < categoryChannels.length; i++) {
                if (parseInt(categoryChannels[i].name.split().pop()) != i + 1) {
                    categoryChannels[i].setName(categoryChannels[i].name.substring(categoryChannels[i].name.lastIndexOf(' ')) + ' ' + (parseInt(categoryChannels[i].name.split(" ").pop()) + 1).toString());
                }
            }
        }
    } else {

    }
});