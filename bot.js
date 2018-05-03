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
        var categoryChannels = newMember.voiceChannel.parent.children.array();
        var userChannel;
        if (newMember.guild.channels.find('name', categoryChannels[0].name.substring(0, categoryChannels[0].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[0].name.split(" ").pop()) + 1).toString()) == null) {
            var permissions = categoryChannels[0].permissionOverwrites.array();
            categoryChannels[categoryChannels.length - 1].clone(categoryChannels[categoryChannels.length - 1].name.substring(0, categoryChannels[categoryChannels.length - 1].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[categoryChannels.length - 1].name.split(" ").pop()) + 1).toString()).then(clone => console.log('Created channel: ' + clone.name));/*.then(clone => {
                clone.setParent(categoryChannels[categoryChannels.length - 1].parent);
                newMember.guild.channels.find('id', clone.id).setUserLimit(categoryChannels[categoryChannels.length - 1].userLimit);
                for (i = 0; i < permissions.length; i++) {
                    clone.overwritePermissions(permissions[i].id, permissions[i]);
                }
            });*/
            console.log(categoryChannels[categoryChannels.length - 1].name.substring(0, categoryChannels[categoryChannels.length - 1].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[categoryChannels.length - 1].name.split(" ").pop()) + 1).toString());
            var clone = newMember.guild.channels.find('name', categoryChannels[categoryChannels.length - 1].name.substring(0, categoryChannels[categoryChannels.length - 1].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[categoryChannels.length - 1].name.split(" ").pop()) + 1).toString());
            clone.setParent(categoryChannels[categoryChannels.length - 1].parent);
            clone.setUserLimit(categoryChannels[categoryChannels.length - 1].parent);
            for (i = 0; i < permissions.length; i++) {
                clone.overwritePermissions(permissions[i].id, permissions[i]);
            }
            return;
        } else if (newMember.voiceChannel.name.split(" ").pop() == '1') {
            userChannel = newMember.guild.channels.find('name', categoryChannels[0].name.substring(0, categoryChannels[0].name.lastIndexOf(" ")) + ' ' + '2');
            userChannel.parentID = categoryChannels[0].parentID;
            categoryChannels = userChannel.parent.children.array();
        }
        console.log(categoryChannels);
        var emptyChannels = [];
        for (i = 0; i < categoryChannels.length; i++) {
            if (categoryChannels[i].members == undefined) {
                emptyChannels.push(categoryChannels[i]);
            }
        }
        if (emptyChannels.length == 0) {
            var permissions = categoryChannels[0].permissionOverwrites.array();
            categoryChannels[categoryChannels.length - 1].clone(categoryChannels[categoryChannels.length - 1].name.substring(0, categoryChannels[categoryChannels.length - 1].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[categoryChannels.length - 1].name.split(" ").pop()) + 1).toString());/*.then(clone => {
                clone.setParent(categoryChannels[categoryChannels.length - 1].parent);
                clone.setUserLimit(categoryChannels[categoryChannels.length - 1].userLimit);
                for (i = 0; i < permissions.length; i++) {
                    clone.overwritePermissions(permissions[i].id, permissions[i]);
                }
            });*/
            var clone = newMember.guild.channels.find('name', categoryChannels[categoryChannels.length - 1].name.substring(0, categoryChannels[categoryChannels.length - 1].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[categoryChannels.length - 1].name.split(" ").pop()) + 1).toString());
            clone.setParent(categoryChannels[categoryChannels.length - 1].parent);
            clone.setUserLimit(categoryChannels[categoryChannels.length - 1].userLimit);
            for (i = 0; i < permissions.length; i++) {
                clone.overwritePermissions(permissions[i].id, permissions[i]);
            }
        }
    } else if (oldMember.voiceChannel != null && newMember.voiceChannel == null) {
        //var categoryChannels = []; //= oldMember.voiceChannel.parent.children.array();
        for (i = 0; i < oldMember.guild.channels.array().length; i++) {
            if (oldMember.guild.channels.array()[i].name.substring(0, oldMember.guild.channels.array()[i].name.lastIndexOf(" ")) == oldMember.voiceChannel.name.substring(0, oldMember.voiceChannel.name.lastIndexOf(' '))) {
                oldMember.guild.channels.array()[i].parentID = oldMember.voiceChannel.parentID;
            }
        }
        var categoryChannels = oldMember.voiceChannel.parent.children.array();
        var emptyChannels = [];
        for (i = 0; i < categoryChannels.length; i++) {
            if (categoryChannels[i].members == undefined) {
                emptyChannels.push(categoryChannels[i]);
            }
        }
        if (emptyChannels.length > 1) {
            for (i = 1; i < emptyChannels.length; i++) {
                if (emptyChannels[i].deletable) {
                    emptyChannels[i].delete();
                } else {
                    console.error('Missing delete permissions');
                }
            }
        }
    } else {

    }
});