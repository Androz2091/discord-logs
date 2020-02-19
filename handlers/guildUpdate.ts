import { Client, Guild } from 'discord.js';

export async function handleGuildUpdateEvent(client: Client, oldGuild: Guild, newGuild: Guild) {
    // If the guild increased in boost level
    if (oldGuild.premiumTier < newGuild.premiumTier) {
        client.emit('guildBoostLevelUp', oldGuild, newGuild);
    }
    // If the guild lowering in boost level
    if (oldGuild.premiumTier > newGuild.premiumTier) {
        client.emit('guildBoostLevelDown', oldGuild, newGuild);
    }
}
