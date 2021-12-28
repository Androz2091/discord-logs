
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
const logs = require("../");
logs(client, {
    debug: true
});

client.on("ready", () => {
    console.log("Ready. Logged as "+client.user.tag+" in "+client.guilds.cache.size+" servers.");
});

/* Channel Events */
// Events related to the channelUpdate event.

client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
  console.log(channel.name+"'s permissions updated!");
});

client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
  console.log(channel.name+"'s topic changed to " + newTopic +"!");
});

client.on("unhandledGuildChannelUpdate", (oldChannel, newChannel) => {
  console.log("Channel '"+oldChannel.id+"' was edited but discord-logs couldn't find what was updated...");
});

/* Guild Member Events */
// Events related to the guildMemberUpdate event.

client.on("guildMemberBoost", (member) => {
  console.log(member.user.tag+" has started boosting "+member.guild.name+"!");
});

client.on("guildMemberUnboost", (member) => {
  console.log(member.user.tag+" has stopped boosting "+member.guild.name+"...");
});

client.on("guildMemberRoleAdd", (member, role) => {
  console.log(member.user.tag+" acquired the role: "+role.name);
});

client.on("guildMemberRoleRemove", (member, role) => {
  console.log(member.user.tag+" lost the role: "+role.name);
});

client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
  console.log(member.user.tag+"'s nickname is now "+newNickname);
});

client.on("guildMemberEntered", (member) => {
  console.log(member.user.tag+" has passed the gate!");
});

client.on("unhandledGuildMemberUpdate", (oldMember, newMember) => {
  console.log("Member '"+oldMember.id+"' was edited but discord-logs couldn't find what was updated...");
});

/* Guild Events */
// Events related to the guildUpdate event.

client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
  console.log(guild.name+" reaches the boost level: "+newLevel);
});

client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
  console.log(guild.name+" returned to the boost level: "+newLevel);
});

client.on("guildBannerAdd", (guild, bannerURL) => {
  console.log(guild.name+" has a banner now!");
});

client.on("guildAfkChannelAdd", (guild, afkChannel) => {
  console.log(guild.name+" has an AFK channel now!");
});

client.on("guildVanityURLAdd", (guild, vanityURL) => {
  console.log(guild.name+" has added a vanity url : "+vanityURL);
});

client.on("guildVanityURLRemove", (guild, vanityURL) => {
  console.log(guild.name+" has removed its vanity url : "+vanityURL);
});

client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {
  console.log(`${guild.name} has changed its vanity URL from ${oldGuildvanityURL} to ${newGuildvanityURL} !`);
});

client.on("guildFeaturesUpdate", (oldGuild, newGuild) => {
  console.log(`New features: ${newGuild.features.join(", ")}`);
});

client.on("guildAcronymUpdate", (oldGuild, newGuild) => {
  console.log(oldGuild.name+" updated its Acronym : "+newGuild.nameAcronym);
});

client.on("guildOwnerUpdate", (oldGuild, newGuild) => {
  console.log(oldGuild.name+" updated its owner : "+newGuild.owner.id);
});

client.on("guildPartnerAdd", (guild) => {
  console.log(guild.name+" got partnered!");
});

client.on("guildPartnerRemove", (guild) => {
  console.log(guild.name+" is no longer partnered!");
});

client.on("guildVerificationAdd", (guild) => {
  console.log(guild.name+" got verified!");
});

client.on("guildVerificationRemove", (guild) => {
  console.log(guild.name+" is no longer verified!");
});

client.on("unhandledGuildUpdate", (oldGuild, newGuild) => {
  console.log("Guild '"+oldGuild.id+"' was edited but discord-logs couldn't find what was updated...");
});

/* Message Events */
// Events related to the messageUpdate event.

client.on("messagePinned", (message) => {
  console.log("This message has been pinned : "+message);
});

client.on("messageContentEdited", (message, oldContent, newContent) => {
  console.log("Message '"+message.id+"' has been edited to "+newContent);
});

client.on("unhandledMessageUpdate", (oldMessage, newMessage) => {
  console.log("Message '"+oldMessage.id+"' was edited but discord-logs couldn't find what was updated...");
});

/* Presence Events */
// Events related to the presenceUpdate event.

client.on("guildMemberOffline", (member, oldStatus) => {
  console.log(member.user.tag+" became offline!");
});

client.on("guildMemberOnline", (member, newStatus) => {
  console.log(member.user.tag+" was offline and is now "+newStatus+"!");
});

client.on("unhandledPresenceUpdate", (oldPresence, newPresence) => {
  console.log("Presence for member "+oldPresence.member.user.tag+"' was updated but discord-logs couldn't find what was updated...");
});

/* Role Events */
// Events related to the roleUpdate event.

client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
  console.log(role.name + " was at position "+oldPosition+" and now is at position "+newPosition);
});

client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {
  console.log(role.name + " had as permissions "+oldPermissions+" and now has as permissions "+newPermissions);
});

client.on('roleIconAdded', (role, iconURL) => {
  console.log(role.name + " added new icon url " + iconURL);
})

client.on("unhandledRoleUpdate", (oldRole, newRole) => {
  console.log("Role '"+oldRole.id+"' was updated but discord-logs couldn't find what was updated...");
});

/* Thread Channel Events */
// Events related to the threadUpdate event.

client.on("threadStateUpdate", (oldThread, newThread) => {
  console.log(`${newThread.name} is now ${newThread.archived ? "archived" : "unarchived"}`);
});

client.on("threadNameUpdate", (thread, oldName, newName) => {
  console.log(oldName + "'s name is updated to " + newName);
});

client.on("threadLockStateUpdate", (oldThread, newThread) => {
  console.log(`${newThread.name} is now ${newThread.locked ? "locked" : "unlocked"}`);
});

client.on("threadRateLimitPerUserUpdate", (thread, oldRateLimitPerUser, newRateLimitPerUser) => {
  console.log(`${thread.name}'s slowmode got changed from ${oldRateLimitPerUser ? oldRateLimitPerUser : 0} seconds to ${newRateLimitPerUser ? newRateLimitPerUser : 0} seconds.`);
});

client.on("threadAutoArchiveDurationUpdate", (thread, oldAutoArchiveDuration, newAutoArchiveDuration) => {
  console.log(thread.name+"'s auto archive duration got changed from " + oldAutoArchiveDuration + " minutes to " + newAutoArchiveDuration + " minutes.");
});

client.on("unhandledThreadUpdate", (oldThread, newThread) => {
  console.log("Thread "+oldThread.id+" was edited but discord-logs couldn't find what was updated...");
});

/* User Events */
// Events related to the userUpdate event.

client.on("userAvatarUpdate", (user, oldAvatarURL, newAvatarURL) => {
  console.log(user.tag+" avatar updated!");
});

client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {
  console.log(user.tag+" username updated!");
});

client.on("userDiscriminatorUpdate", (user, oldDiscriminator, newDiscriminator) => {
  console.log(user.tag+" discriminator updated!");
});

client.on("userFlagsUpdate", (user, oldFlags, newFlags) => {
  console.log(user.tag+" flags updated!");
});

client.on("unhandledUserUpdate", (oldUser, newUser) => {
  console.log("User '"+oldUser.id+"' was updated but discord-logs couldn't find what was updated...");
});

/* Voice Events */
// Events related to the voiceStateUpdate event.

client.on("voiceChannelJoin", (member, channel) => {
  console.log(member.user.tag+" joined "+channel.name+"!");
});

client.on("voiceChannelLeave", (member, channel) => {
  console.log(member.user.tag+" left "+channel.name+"!");
});

client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {
  console.log(member.user.tag+" left "+oldChannel.name+" and joined "+newChannel.name+"!");
});

client.on("voiceChannelMute", (member, muteType) => {
  console.log(member.user.tag+" become muted! (type: "+muteType);
});

client.on("voiceChannelUnmute", (member, oldMuteType) => {
  console.log(member.user.tag+" become unmuted!");
});

client.on("voiceChannelDeaf", (member, deafType) => {
  console.log(member.user.tag+" become deafed!");
});

client.on("voiceChannelUndeaf", (member, deafType) => {
  console.log(member.user.tag+" become undeafed!");
});

client.on("voiceStreamingStart", (member, voiceChannel) => {
  console.log(member.user.tag+" started streaming in "+voiceChannel.name);
});

client.on("voiceStreamingStop", (member, voiceChannel) => {
  console.log(member.user.tag+" stopped streaming");
});

client.on("unhandledVoiceStateUpdate", (oldState, newState) => {
  console.log("Voice state for member '"+oldState.member.user.tag+"' was updated but discord-logs couldn't find what was updated...");
});

client.login(process.env.TOKEN);
