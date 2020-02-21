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
     * @event guildMemberPresenceUpdate
     * @description Emitted when a member becomes online, dnd, idle or offline.
     * @param {DJS:GuildMember} member The member who became "online","idle","dnd" or "offline"
     * @param {DJST:Status} newStatus The new member status, it can be "dnd", "idle", "online" or "offline".
     * @example
     * client.on("guildMemberPresenceUpdate", (member, oldStatus, newStatus) => {
     *   console.log(member.user.tag+" was " + oldStatus + " and is now "+newStatus+"!");
     * });
     */
    if (oldPresence.status !==newPresence.status) {
        return client.emit('guildMemberPresenceUpdate', newPresence.member, oldPresence.status,newPresence.status);
    }
}
