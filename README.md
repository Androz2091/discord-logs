# Discord Logs

[![downloadsBadge](https://img.shields.io/npm/dt/discord-logs?style=for-the-badge)](https://npmjs.com/discord-logs)
[![versionBadge](https://img.shields.io/npm/v/discord-logs?style=for-the-badge)](https://npmjs.com/discord-logs)

Discord Logs is a powerful package which add many useful events to your Discord.js (v14) client!

```js
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildMembers
    ]
});
const logs = require('discord-logs');
logs(client);

// Access to new events, like guildMemberBoost!
client.on('guildMemberBoost', (member) => {
    console.log(`${member.user.tag} just boosted ${member.guild.name}!`);
});

client.login('YOUR_DISCORD_BOT_TOKEN');
```

## [Click here to see the list of all the handled events!](https://discord-logs.js.org)

## Troubleshooting

You can enable debug to try to know why an event is not working:

```js
const logs = require('discord-logs');
logs(client, {
    debug: true
});
```
