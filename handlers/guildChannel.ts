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
     * client.on("guildChannelPermissionsChanged", (channel,oldPermissions,newPermissions) => {
     *   console.log(channel.name+" has changed permissions !");
     * });
     */
    if (oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
        client.emit('guildChannelPermissionsChanged', newChannel,oldChannel.permissionOverwrites,newChannel.permissionOverwrites);
        emitted = true;
    }
   }
