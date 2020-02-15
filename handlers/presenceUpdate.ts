import { Client, Presence } from 'discord.js';

export async function handlePresenceUpdateEvent(
    client: Client,
    oldPresence: Presence | null | undefined,
    newPresence: Presence,
) {
    if (!oldPresence) return;
    // Check if the member is now online
    if (oldPresence.status === 'offline' && newPresence.status !== 'offline') {
        return client.emit('guildMemberOnline', oldPresence.member, newPresence.member);
    }
    // Check if the member is now offline
    if (oldPresence.status !== 'offline' && newPresence.status === 'offline') {
        return client.emit('guildMemberOffline', oldPresence.member, newPresence.member);
    }
}
