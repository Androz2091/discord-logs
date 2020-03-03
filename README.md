# Discord Logs

[![downloadsBadge](https://img.shields.io/npm/dt/discord-logs?style=for-the-badge)](https://npmjs.com/discord-logs)
[![versionBadge](https://img.shields.io/npm/v/discord-logs?style=for-the-badge)](https://npmjs.com/discord-logs)
[![patreonBadge](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2FAndroz2091%2Fpledges&style=for-the-badge)](https://patreon.com/Androz2091)

Discord Logs is a powerful package which add many useful events to your Discord.js client!

**Warning**: This package uses recent Discord.js features and only works on v12 or higher (`npm install discord.js`).

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

## [Click here to see the list of all the handled events!](https://discord-logs.js.org)
