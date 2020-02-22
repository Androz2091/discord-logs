
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const logs = require("../");
logs(client);

client.on("ready", () => {
    console.log("Ready. Logged as "+client.user.tag+" in "+client.guilds.cache.size+" servers.");
});

/* Guild Member Events */
// Events related to the guildMemberUpdate event.

client.on("guildMemberBoost", (member) => {
  console.log(member.user.tag+" has started boosting "+member.guild.name+"!");
});

client.on("guildMemberBoost", (member) => {
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

client.on("guildRegionUpdate", (guild, oldRegion, newRegion) => {
  console.log(guild.name+" region is now "+newRegion);
});

client.on("guildBannerAdd", (guild, bannerURL) => {
  console.log(guild.name+" has a banner now!");
});

client.on("guildAfkChannelAdd", (guild, afkChannel) => {
  console.log(guild.name+" has an AFK channel now!");
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

client.on("unhandledRoleUpdate", (oldRole, newRole) => {
  console.log("Role '"+oldRole.id+"' was updated but discord-logs couldn't find what was updated...");
});

/* User Events */
// Events related to the userUpdate event.

client.on("userAvatarUpdate", (user, oldAvatarURL, newAvatarURL) => {
  console.log(user.tag+" avatar updated!");
});

client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {
  console.log(user.tag+" username updated!");
});

client.on("userUsernameUpdate", (user, oldDiscriminator, newDiscriminator) => {
  console.log(user.tag+" discriminator updated!");
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

client.on("voiceChannelMute", (member, oldMuteType) => {
  console.log(member.user.tag+" become unmuted!");
});

client.on("voiceChannelDeaf", (member, deafType) => {
  console.log(member.user.tag+" become deafed!");
});

client.on("voiceChannelUneaf", (member, deafType) => {
  console.log(member.user.tag+" become undeafed!");
});

client.on("voiceStreamingStart", (member, voiceChannel) => {
  console.log(member.user.tag+" started streaming in "+voiceChannel.name);
});

client.on("voiceStreamingStop", (member, voiceChannel) => {
  console.log(member.user.tag+" stopped streaming");
});

client.on("unhandledRoleUpdate", (oldState, newState) => {
  console.log("Voice state for member '"+oldState.member.user.tag+"' was updated but discord-logs couldn't find what was updated...");
});

client.login(process.env.TOKEN);
