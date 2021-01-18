require("dotenv").config();
import { Client } from 'discord.js'
const client = new Client();
import logs from '../index'
logs(client);

client.on("ready", () => {
    console.log("Ready. Logged as "+client.user.tag+" in "+client.guilds.cache.size+" servers.");
});

client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
  console.log(channel.name+"'s permissions updated!");
});

client.login()