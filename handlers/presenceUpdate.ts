import { Client, Presence } from 'discord.js';

/**
 * @handler Presence Events
 * @related presenceUpdate
 */
export async function handlePresenceUpdateEvent(
    client: Client,
    oldPresence: Presence | null | undefined,
    newPresence: Presence,
) {
    if (!oldPresence) return;
    /**
     * @event guildMemberOffline
     * @description Emitted when a member becomes offline.
     * @param {DJS:GuildMember} member The member who became offline.
     * @param {DJST:Status} oldStatus The old member status, it can be "dnd", "idle" or "online".
     * @example
     * client.on("guildMemberOffline", (member, oldStatus) => {
     *   console.log(member.user.tag+" became offline!");
     * });
     */
    if (oldPresence.status !== 'offline' && newPresence.status === 'offline') {
        return client.emit('guildMemberOffline', newPresence.member, oldPresence.status);
    }
    /**
             * @event guildMemberOnline
             * @description Emitted when a member becomes online, dnd or idle.
             * @param {DJS:GuildMember} member The member who became online.
             * @param {DJST:Status} newStatus The new member status, it can be "dnd", "idle" or "online".
              * @param {DJST:Status} oldStatus The old member status, it can be "dnd", "idle" , "online" or "offline".
             * @example
             * client.on("guildMemberOnline", (member, oldStatus, newStatus) => {
             *   console.log(member.user.tag+" was "+oldStatus+" and is now online!");
             * });
             */
            if (oldPresence.status !== 'online' && newPresence.status === 'online') {
                client.emit('guildMemberOnline', newPresence.member, oldPresence.status);
            }
    /**
             * @event guildMemberIdle
             * @description Emitted when a member becomes online, dnd or idle.
             * @param {DJS:GuildMember} member The member who became idle.
             * @param {DJST:Status} newStatus The new member status, it can be "dnd", "idle" or "online".
              * @param {DJST:Status} oldStatus The old member status, it can be "dnd", "idle" , "online" or "offline".
             * @example
             * client.on("guildMemberOnline", (member, oldStatus, newStatus) => {
             *   console.log(member.user.tag+" was "+oldStatus+" and is now idle !");
             * });
             */
            if (oldPresence.status !== 'idle' && newPresence.status === 'idle') {
                client.emit('guildMemberIdle', newPresence.member, oldPresence.status);
            }
    /**
             * @event guildMemberDnd
             * @description Emitted when a member becomes online, dnd or idle.
             * @param {DJS:GuildMember} member The member who became dnd.
             * @param {DJST:Status} newStatus The new member status, it can be "dnd", "idle" or "online".
              * @param {DJST:Status} oldStatus The old member status, it can be "dnd", "idle" , "online" or "offline".
             * @example
             * client.on("guildMemberOnline", (member, oldStatus) => {
             *   console.log(member.user.tag+" was "+oldStatus+" and is now dnd!");
             * });
             */
            if (oldPresence.status !== 'dnd' && newPresence.status === 'dnd') {
                client.emit('guildMemberDnd', newPresence.member, oldPresence.status);
            }
}
