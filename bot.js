const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config');
client.login(process.env.BOT_TOKEN);


client.on('ready', () => {
    console.log('Ready');
});



client.on('voiceStateUpdate', (oldMember, newMember) => {
    /*if (oldMember.voiceChannel == null && newMember.voiceChannel != null) {
        var categoryChannels = newMember.voiceChannel.parent.children.array();
        var userChannel;
        if (newMember.guild.channels.find('name', categoryChannels[0].name.substring(0, categoryChannels[0].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[0].name.split(" ").pop()) + 1).toString()) == null) {
            var permissions = categoryChannels[0].permissionOverwrites.array();
            newMember.guild.createChannel(categoryChannels[0].name.substring(0, categoryChannels[0].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[0].name.split(" ").pop()) + 1).toString(), 'voice', permissions).then(console.log).catch(console.error);
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
            categoryChannels[categoryChannels.length - 1].clone(categoryChannels[categoryChannels.length - 1].name.substring(0, categoryChannels[categoryChannels.length - 1].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[categoryChannels.length - 1].name.split(" ").pop()) + 1).toString());.then(clone => {
                clone.setParent(categoryChannels[categoryChannels.length - 1].parent);
                clone.setUserLimit(categoryChannels[categoryChannels.length - 1].userLimit);
                for (i = 0; i < permissions.length; i++) {
                    clone.overwritePermissions(permissions[i].id, permissions[i]);
                }
            });
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

    }*/
    if (oldMember.voiceChannel == null && newMember.voiceChannel != null) {
        var everyoneRole = newMember.guild.roles.find('name', '@everyone');
        for(i = 0; i < config.channels.length; i++){
            if(newMember.voiceChannel.name.substring(0, newMember.voiceChannel.name.lastIndexOf(' ')) == config.channels[i]){
                if (newMember.guild.channels.find('name', config.channels[i] + ' 10') == null) {
                    var permissions = newMember.voiceChannel.permissionOverwrites.array();
                    for (a = 1; a <= 10; a++) {
                        if(newMember.guild.channels.find('name', config.channels[i] + ' ' + a.toString()) == null){
                            newMember.voiceChannel.clone(config.channels[i] + ' ' + a.toString()).then(clone => {
                                clone.setParent(newMember.voiceChannel.parent);
                                clone.setUserLimit(newMember.voiceChannel.userLimit);
                                for (i = 0; i < permissions.length; i++) {
                                    clone.overwritePermissions(permissions[i].id, permissions[i]);
                                }
                                clone.overwritePermissions(everyoneRole, { VIEW_CHANNEL: false });
                            });
                        }
                    }
                }
            }
        }  

        var categoryChannels = newMember.voiceChannel.parent.children.array();
        if (newMember.voiceChannel.name.split(" ").pop() == '1') {
            userChannel = newMember.guild.channels.find('name', categoryChannels[0].name.substring(0, categoryChannels[0].name.lastIndexOf(" ")) + ' ' + '2');
            userChannel.parentID = categoryChannels[0].parentID;
            categoryChannels = userChannel.parent.children.array();
        }
        var emptyChannels = [];
        
        var tempPermissions = newMember.voiceChannel.permissionOverwrites.find(everyoneRole);
        console.log(tempPermissions);
        var permissions = newMember.voiceChannel.permissionOverwrites.array();
        newMember.voiceChannel.clone(newMember.voiceChannel.name.substring(0, newMember.voiceChannel.name.lastIndexOf(' ')) + ' permissions').then(clone => {
            for (i = 0; i < permissions.length; i++) {
                clone.overwritePermissions(permissions[i].id, permissions[i]);
            }
            clone.overwritePermissions(everyoneRole, { VIEW_CHANNEL: false });
        });
        for (i = 0; i < categoryChannels.length; i++) {
            if (categoryChannels[i].members == undefined && newMember.guild.channels.find('name', newMember.voiceChannel.name.substring(0, newMember.voiceChannel.name.lastIndexOf(' ')) + ' permissions').permissionOverwrites == categoryChannels[i].permissionOverwrites) {
                emptyChannels.push(categoryChannels[i]);
            }
        }
        console.log(emptyChannels);
        if (emptyChannels.length == 0) {
            
        }
    } else if (oldMember.voiceChannel != null && newMember.voiceChannel == null) {

    }
});