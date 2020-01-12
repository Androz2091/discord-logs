# Discord Logs

Discord Logs is a powerful package which add many useful events to your Discord.js client!

**Warning**: This package uses recent Discord.js features and only works on v12 or higher (`npm install discordjs/discord.js`).

```js
const Discord = require('discord.js');
const client = new Discord.Client();
const logs = require('discord-logs');
logs(client);

// Access to new events, like guildMemberRoleAdd!
client.on('guildMemberRoleAdd', (member, role) => {
    console.log(`${member.user.tag} now has the role ${role.name}!`);
});

client.login('YOUR_DISCORD_BOT_TOKEN');
```

## Event List

You will find here all new events that Discord Logs implement. Not all events that could be supported are supported by the module. You can open a pull request to add new ones.

### Member Events

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

### User Events

* `userAvatarUpdate`: emitted when a user avatar changes
  
```js
// When a user avatar changes
client.on('userAvatarUpdate', (oldUser, newUser) => {
    console.log(`${newMember.user.tag}'s avatar updated!`);
});
```

* `userUsernameUpdate`: emitted when a user username changes
  
```js
// When a user username changes
client.on('userUsernameUpdate', (oldUser, newUser) => {
    console.log(`${oldUser.user.username} is now ${newUser.user.username}!`);
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
client.on('voiceChannelMute', (oldMember, newMember) => {
    console.log(`${oldMember.user.tag} is now unmuted!`);
});
```