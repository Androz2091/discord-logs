import { Client, Guild } from 'discord.js';

export async function handleGuildUpdateEvent(client: Client, oldGuild: Guild, newGuild: Guild) {
    // If the guild's boost level has increased
    if (oldGuild.premiumTier < newGuild.premiumTier) {
        client.emit('guildBoostLevelUp', oldGuild, newGuild);
    }
    // If the guild's boost level has decreased
    if (oldGuild.premiumTier > newGuild.premiumTier) {
        client.emit('guildBoostLevelDown', oldGuild, newGuild);
    }
    // If the guild region has changed
    if (oldGuild.region !== newGuild.region) {
        client.emit('guildRegionUpdate', oldGuild, newGuild);
    }
}
