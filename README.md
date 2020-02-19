# Discord Logs

[![downloadsBadge](https://img.shields.io/npm/dt/discord-logs?style=for-the-badge)](https://npmjs.com/discord-logs)
[![versionBadge](https://img.shields.io/npm/v/discord-logs?style=for-the-badge)](https://npmjs.com/discord-logs)
[![patreonBadge](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2FAndroz2091%2Fpledges&style=for-the-badge)](https://patreon.com/Androz2091)

Discord Logs is a powerful package which add many useful events to your Discord.js client!

**Warning**: This package uses recent Discord.js features and only works on v12 or higher (`npm install discordjs/discord.js`).

```js
const Discord = require('discord.js');
const client = new Discord.Client();
const logs = require('discord-logs');
logs(client);

// Access to new events, like guildMemberBoost!
client.on('guildMemberBoost', (member) => {
    console.log(`${member.user.tag} just boosted ${member.guild.name}!`);
});

client.login('YOUR_DISCORD_BOT_TOKEN');
```

## Event List

You will find here all new events that Discord Logs implement. Not all events that could be supported are supported by the module. You can open a pull request to add new ones.

### Member Events

* `guildMemberBoost`: emitted when a member starts boosting the server
```js
// When a member starts boosting the server
client.on('guildMemberBoost', (member) => {
    console.log(`${member.user.tag} just boosted ${member.guild.name}!`);
});
```

* `guildMemberRoleAdd`: emitted when a member receives a new role

```js
// When a role is added to a member
client.on('guildMemberRoleAdd', (member, role) => {
    console.log(`${member.user.tag} now has the role ${role.name}!`);
});
```

* `guildMemberRoleRemove`: emitted when a member loses a role

```js
// When a role is removed from a member
client.on('guildMemberRoleRemove', (member, role) => {
    console.log(`${member.user.tag} lost the role ${role.name}!`);
});
```

* `guildMemberNicknameUpdate`: emitted when a member's nickname is updated
```js
// When a member nickname changes
client.on('guildMemberNicknameUpdate', (oldMember, newMember) => {
    console.log(`${newMember.user.tag}'s nickname is now ${newMember.nickname}!`);
});
```

### Presence Events

* `guildMemberOnline`: emitted when a member is now online
  
```js
// When a member is now online
client.on('guildMemberOnline', (oldMember, newMember) => {
    console.log(`${newMember.user.tag} is now online!`);
});
```

* `guildMemberOffline`: emitted when a member is now offline
  
```js
// When a member is now offline
client.on('guildMemberOffline', (oldMember, newMember) => {
    console.log(`${newMember.user.tag} is now offline!`);
});
```

* `guildMemberIdle`: emitted when a member is now idle
  
```js
// When a member is now idle
client.on('guildMemberIdle', (oldMember, newMember) => {
    console.log(`${newMember.user.tag} is now idle!`);
});
```

### Guild Events

* `guildBoostLevelUp`: emitted when the guild boost level increases
  
```js
// When the guild's boost level increases
client.on('guildBoostLevelUp', (oldGuild, newGuild) => {
    console.log(`${newGuild.name}'s boost level is now ${newGuild.premiumTier}!`);
});
```

* `guildBoostLevelUp`: emitted when the guild boost level decreases
  
```js
// When the guild's boost level decreases
client.on('guildBoostLevelDown', (oldGuild, newGuild) => {
    console.log(`${newGuild.name}'s boost level is now ${newGuild.premiumTier}!`);
});
```

* `guildRegionUpdate`: emitted when the guild region has changed
  
```js
// When the guild region has changed
client.on('guildRegionUpdate', (oldGuild, newGuild) => {
    console.log(`${newGuild.name}'s region is now: ${newGuild.region}`);
});
```

### User Events

* `userAvatarUpdate`: emitted when a user avatar changes
  
```js
// When a user avatar changes
client.on('userAvatarUpdate', (oldUser, newUser) => {
    console.log(`${newMember.tag}'s avatar updated!`);
});
```

* `userUsernameUpdate`: emitted when a user username changes
  
```js
// When a user username changes
client.on('userUsernameUpdate', (oldUser, newUser) => {
    console.log(`${oldUser.username} is now ${newUser.username}!`);
});
```

* `userDiscriminatorEvent`: emitted when a user discriminator changes
```js
// When a user discrminator changes
client.on('userDiscriminatorUpdate', (oldUser, newUser) => {
    console.log(`${oldUser.username}'s discriminator is now ${newUser.discriminator}!`);
});
```

### Voice State Events

* `voiceChannelJoin`: emitted when a member joins a voice channel

```js
// When a member joins a voice channel
client.on('voiceChannelJoin', (oldMember, newMember) => {
    console.log(`${newMember.user.tag} joined the voice channel ${newMember.voice.channel.name}!`);
});
```

* `voiceChannelLeave`: emitted when a member leaves a voice channel

```js
// When a member leaves a voice channel
client.on('voiceChannelLeave', (oldMember, newMember) => {
    console.log(`${oldMember.user.tag} left the voice channel ${oldMember.voice.channel.name}!`);
});
```

* `voiceChannelSwitch`: emitted when a member switches to another voice channel

```js
// When a member switches to another voice channel
client.on('voiceChannelSwitch', (oldMember, newMember) => {
    console.log(`${oldMember.user.tag} left the voice channel ${oldMember.voice.channel.name} and joined ${newMember.voice.channel.name}!`);
});
```

* `voiceChannelMute`: emitted when a member become muted

```js
// When a member become muted
client.on('voiceChannelMute', (oldMember, newMember) => {
    console.log(`${oldMember.user.tag} is now muted!`);
});
```

* `voiceChannelUnmute`: emitted when a member become unmuted

```js
// When a member become unmuted
client.on('voiceChannelUnmute', (oldMember, newMember) => {
    console.log(`${oldMember.user.tag} is now unmuted!`);
});
```

* `voiceChannelDeaf`: emitted when a member become deafed

```js
// When a member become deafed
client.on('voiceChannelDeaf', (oldMember, newMember) => {
    console.log(`${oldMember.user.tag} is now deafed!`);
});
```

* `voiceChannelUnmute`: emitted when a member become unmuted

```js
// When a member become undeafed
client.on('voiceChannelUndeafed', (oldMember, newMember) => {
    console.log(`${oldMember.user.tag} is now undeafed!`);
});
```