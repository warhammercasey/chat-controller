const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config');
client.login(process.env.BOT_TOKEN);


client.on('ready', () => {
    console.log('Ready');
});

client.on('message', message => {
	console.log("test");
	if(message.member.user.bot){
		return;
  	}
	message.channel.send("Fuck you " + message.member.displayName)
		.then(message => console.log(`Sent message: ${message.content}`))
        	.catch(console.error);
	if(message.content.includes("im")){
		message.channel.send("Hi " + message.content.substring(message.content.indexOf('im') + 3) + ", im dad!")
			.then(message => console.log(`Sent message: ${message.content}`))
        		.catch(console.error);
	}
});


client.on('voiceStateUpdate', (oldMember, newMember) => {
    console.log("test");
	if(message.member.user.bot){
		
		return;  
  	}
	message.channel.send("Fuck you " + message.member.nickname)
		.then(message => console.log(`Sent message: ${message.content}`))
        	.catch(console.error);
    if (oldMember.voiceChannel == null && newMember.voiceChannel != null) {
        var categoryChannels = newMember.voiceChannel.parent.children.array();
        var userChannel;
        if (newMember.guild.channels.find('name', categoryChannels[0].name.substring(0, categoryChannels[0].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[0].name.split(" ").pop()) + 1).toString()) == null) {
            var permissions = categoryChannels[0].permissionOverwrites.array();
            newMember.guild.createChannel(categoryChannels[0].name.substring(0, categoryChannels[0].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[0].name.split(" ").pop()) + 1).toString(), 'voice', permissions).then(clone => {
                clone.setParent(categoryChannels[categoryChannels.length - 1].parent);
                clone.setUserLimit(categoryChannels[categoryChannels.length - 1].userLimit);
                for (i = 0; i < permissions.length; i++) {
                    clone.overwritePermissions(permissions[i].id, permissions[i]);
                }
            }).catch(console.error);
            //var clone = newMember.guild.channels.find('name', categoryChannels[categoryChannels.length - 1].name.substring(0, categoryChannels[categoryChannels.length - 1].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[categoryChannels.length - 1].name.split(" ").pop()) + 1).toString());
            
            return;
        } else if (newMember.voiceChannel.name.split(" ").pop() == '1') {
            var correctCategory = false;
            while(!correctCategory){
                userChannel = newMember.guild.channels.find('name', categoryChannels[0].name.substring(0, categoryChannels[0].name.lastIndexOf(" ")) + ' ' + '2');
                if(userChannel.parentID == newMember.voiceChannel.parentID){
                    correctCategory = true;
                }
            }
            userChannel.setParent(categoryChannels[0].parent);
            categoryChannels = userChannel.parent.children.array();
        }
        var emptyChannels = [];
        for (i = 0; i < categoryChannels.length; i++) {
            console.log(categoryChannels[i].members);
            if (categoryChannels[i].members == undefined || categoryChannels[i].members == null || categoryChannels[i].members.array().length == 0) {
                emptyChannels.push(categoryChannels[i]);
            }
        }
        if (emptyChannels.length == 0) {
            var permissions = categoryChannels[0].permissionOverwrites.array();
            newMember.guild.createChannel(categoryChannels[categoryChannels.length - 1].name.substring(0, categoryChannels[categoryChannels.length - 1].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[categoryChannels.length - 1].name.split(" ").pop()) + 1).toString(), 'voice', permissions).then(clone => {
                clone.setParent(categoryChannels[categoryChannels.length - 1].parent);
                clone.setUserLimit(categoryChannels[categoryChannels.length - 1].userLimit);
                for (i = 0; i < permissions.length; i++) {
                    clone.overwritePermissions(permissions[i].id, permissions[i]);
                }
            }).catch(console.error);
        }
    } else if (oldMember.voiceChannel != null && newMember.voiceChannel == null) {
        var categoryChannels = oldMember.voiceChannel.parent.children.array();
        var userChannel;
        if (oldMember.voiceChannel.name.split(" ").pop() == '1') {
            if (oldMember.guild.channels.find('name', categoryChannels[0].name.substring(0, categoryChannels[0].name.lastIndexOf(" ")) + ' ' + (parseInt(categoryChannels[0].name.split(" ").pop()) + 1).toString()) == null) { return; }
            var correctCategory = false;
            while (!correctCategory) {
                userChannel = oldMember.guild.channels.find('name', categoryChannels[0].name.substring(0, categoryChannels[0].name.lastIndexOf(" ")) + ' ' + '2');
                if (userChannel.parentID == oldMember.voiceChannel.parentID) {
                    correctCategory = true;
                }
            }
            userChannel.setParent(categoryChannels[0].parent);
            categoryChannels = userChannel.parent.children.array();
        }
        var emptyChannels = [];
        for (i = 0; i < categoryChannels.length; i++) {
            console.log(categoryChannels[i].members);
            if (categoryChannels[i].members == undefined || categoryChannels[i].members == null || categoryChannels[i].members.array().length == 0) {
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
    /*if (oldMember.voiceChannel == null && newMember.voiceChannel != null) {
        for(i = 0; i < config.channels.length; i++){
            if (newMember.voiceChannel.name.substring(0, newMember.voiceChannel.name.lastIndexOf(' ')) == config.channels[i]) {
                console.log('1');
                if (newMember.guild.channels.find('name', config.channels[i] + ' 10') == null) {
                    console.log('2');
                    var permissions = newMember.voiceChannel.permissionOverwrites.array();
                    for (a = 1; a <= 10; a++) {
                        console.log('3');
                        if (newMember.guild.channels.find('name', config.channels[i] + ' ' + a.toString()) == null) {
                            console.log('4');
                            newMember.voiceChannel.clone(config.channels[i] + ' ' + a.toString()).then(clone => {
                                console.log('Created channel: ' + clone.name);
                                clone.setParent(newMember.voiceChannel.parent);
                                clone.setUserLimit(newMember.voiceChannel.userLimit);
                                for (i = 0; i < permissions.length; i++) {
                                    clone.overwritePermissions(permissions[i].id, permissions[i]);
                                }
                                clone.overwritePermissions(newMember.guild.roles.find('name', '@everyone'), { VIEW_CHANNEL: false });
                            }).catch(console.error);
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
        for (i = 0; i < categoryChannels.length; i++) {
            if (categoryChannels[i].members == undefined && newMember.voiceChannel.permissionOverwrites == categoryChannels[i].permissionOverwrites) {
                emptyChannels.push(categoryChannels[i]);
            }
        }
        console.log(emptyChannels);
        if (emptyChannels.length == 0) {
            
        }
    } else if (oldMember.voiceChannel != null && newMember.voiceChannel == null) {

    }*/
});
