import { Client, GuildChannel } from 'discord.js';

/**
 * @handler Guild Channel Events
 * @related guildChannelUpdate
 */
export async function handleGuildChannelUpdateEvent(client: Client, oldChannel: GuildChannel, newChannel: GuildChannel) {
    let emitted = false;
    /**
     * @event guildChannelPermissionsChanged
     * @description Emitted when channel permissions change.
     * @param {DJS:GuildChannel} channel The channel whose permissions have been changed.
     * @example
     * client.on("guildChannelPermissionsChanged", (channel, oldPermissions, newPermissions) => {
     *   console.log(channel.name+"'s permissions changed!");
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
