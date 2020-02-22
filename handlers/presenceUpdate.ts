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
    let emitted = false;
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
        client.emit('guildMemberOffline', newPresence.member, oldPresence.status);
        emitted = true;
    }
    /**
     * @event guildMemberOnline
     * @description Emitted when a member becomes online, dnd or idle.
     * @param {DJS:GuildMember} member The member who became online.
     * @param {DJST:Status} newStatus The new member status, it can be "dnd", "idle" or "online".
     * @example
     * client.on("guildMemberOnline", (member, newStatus) => {
     *   console.log(member.user.tag+" was offline and is now "+newStatus+"!");
     * });
     */
    if (oldPresence.status === 'offline' && newPresence.status !== 'offline') {
        client.emit('guildMemberOnline', newPresence.member, newPresence.status);
        emitted = true;
    }
    /**
     * @event unhandledPresenceUpdate
     * @description Emitted when the presenceUpdate event is triggered but discord-logs didn't trigger any custom event.
     * @param {DJS:Presence} oldPresence The presence before the update.
     * @param {DJS:Presence} newPresence The presence after the update.
     * @example
     * client.on("unhandledPresenceUpdate", (oldPresence, newPresence) => {
     *   console.log("Presence for member "+oldPresence.member.user.tag+"' was updated but discord-logs couldn't find what was updated...");
     * });
     */
    if (!emitted) {
        client.emit('unhandledPresenceUpdate', oldPresence, newPresence);
    }
}
