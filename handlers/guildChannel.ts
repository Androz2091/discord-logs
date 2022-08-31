import { Channel, ChannelType, Client, TextChannel, GuildChannel, Constants } from 'discord.js';

/**
 * @handler Channel Events
 * @related channelUpdate
 */
export async function handleChannelUpdateEvent(client: Client, oldChannel: Channel, newChannel: Channel) {
    let emitted = false;

    if (Object.prototype.hasOwnProperty.call(oldChannel, 'guild')) {
        /**
         * @event guildChannelPermissionsUpdate
         * @description Emitted when channel permissions are updated.
         * @param {DJS:GuildChannel} channel The channel whose permissions have been updated.
         * @param {DJS:PermissionOverwrites} oldPermissions Collection of old PermissionOverwrites.
         * @param {DJS:PermissionOverwrites} newPermissions Collection of new PermissionOverwrites.
         * @example
         * client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
         *   console.log(channel.name+"'s permissions updated!");
         * });
         */
        if ((oldChannel as GuildChannel).permissionOverwrites !== (newChannel as GuildChannel).permissionOverwrites) {
            client.emit(
                'guildChannelPermissionsUpdate',
                newChannel,
                (oldChannel as GuildChannel).permissionOverwrites,
                (newChannel as GuildChannel).permissionOverwrites,
            );
            emitted = true;
        }

        /**
         * @event guildChannelTopicUpdate
         * @description Emitted when a channel topic changes.
         * @param {DJS:GuildChannel} channel The channel whose topic have been updated.
         * @param {string} oldTopic The old channel topic.
         * @param {string} newTopic The new channel topic.
         * @example
         * client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
         *   console.log(channel.name+"'s topic changed to " + newTopic +"!");
         * });
         */
        if (
            oldChannel.type === ChannelType.GuildText &&
            (oldChannel as TextChannel).topic !== (newChannel as TextChannel).topic
        ) {
            client.emit(
                'guildChannelTopicUpdate',
                newChannel,
                (oldChannel as TextChannel).topic,
                (newChannel as TextChannel).topic,
            );
            emitted = true;
        }
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
