import { Client, GuildChannel } from 'discord.js';

/**
 * @handler Guild Channel Events
 * @related guildChannelUpdate
 */
export async function handleGuildChannelUpdateEvent(client: Client, oldChannel: GuildChannel, newChannel: GuildChannel) {
    let emitted = false;
    /**
     * @event guildChannelPermissionsChanged
     * @description Emitted when a channel had changed permissions.
     * @param {DJS:GuildChannel} channel The channel who changed permissions.
     * @example
     * client.on("guildChannelPermissionsChanged", (channel, oldPermissions, newPermissions) => {
     *   console.log(channel.name+" has changed permissions !");
     * });
     */
    if (oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
        client.emit('guildChannelPermissionsChanged', newChannel,oldChannel.permissionOverwrites,newChannel.permissionOverwrites);
        emitted = true;
    }
    
        /**
     * @event unhandledGuildChannelUpdate
     * @description Emitted when the guildChannelUpdate event is triggered but discord-logs didn't trigger any custom event.
     * @param {DJS:GuildChannel} oldChannel The channel before the update.
     * @param {DJS:GuildChannel} newChannel The channel after the update.
     * @example
     * client.on("unhandledGuildChannelUpdate", (oldChannel, newChannel) => {
     *   console.log("Channel '"+oldChannel.id+"' was edited but discord-logs couldn't find what was updated...");
     * });
     */
    if (!emitted) {
        client.emit('unhandledGuildChannelUpdate', oldChannel, newChannel);
    }
   }
