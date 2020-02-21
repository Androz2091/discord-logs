import { Client, Guild } from 'discord.js';

/**
 * @handler Guild Events
 * @related guildUpdate
 */
export async function handleGuildUpdateEvent(client: Client, oldGuild: Guild, newGuild: Guild) {
    /**
     * @event guildBoostLevelUp
     * @description Emitted when a guild's boost level increases.
     * @param {DJS:Guild} guild The guild whose boost level has increased.
     * @param {number} oldLevel The old boost level.
     * @param {number} newLevel The new boost level.
     * @example
     * client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
     *   console.log(guild.name+" reaches the boost level: "+newLevel);
     * });
     */
    if (oldGuild.premiumTier < newGuild.premiumTier) {
        client.emit('guildBoostLevelUp', newGuild, oldGuild.premiumTier, newGuild.premiumTier);
    }
    /**
     * @event guildBoostLevelDown
     * @description Emitted when a guild's boost level decreases.
     * @param {DJS:Guild} guild The guild whose boost level has decreased.
     * @param {number} oldLevel The old boost level.
     * @param {number} newLevel The new boost level.
     * @example
     * client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
     *   console.log(guild.name+" returned to the boost level: "+newLevel);
     * });
     */
    if (oldGuild.premiumTier > newGuild.premiumTier) {
        client.emit('guildBoostLevelDown', oldGuild, newGuild);
    }
    /**
     * @event guildRegionUpdate
     * @description Emitted when a guild region changes.
     * @param {DJS:Guild} guild The guild whose region has changed.
     * @param {string} oldRegion The old guild region.
     * @param {string} newRegion The new guild region.
     * @example
     * client.on("guildRegionUpdate", (guild, oldRegion, newRegion) => {
     *   console.log(guild.name+" region is now "+newRegion);
     * });
     */
    if (oldGuild.region !== newGuild.region) {
        client.emit('guildRegionUpdate', newGuild, oldGuild.region, newGuild.region);
    }
    /**
     * @event guildBannerAdd
     * @description Emitted when a guild banner is added.
     * @param {DJS:Guild} guild The guild whose banner has been added.
     * @param {string} bannerURL The guild banner.
     * @example
     * client.on("guildBannerAdd", (guild, bannerURL) => {
     *   console.log(guild.name+" has a banner now!");
     * });
     */
    if (!oldGuild.banner && newGuild.banner) {
        client.emit('guildBannerAdd', newGuild, newGuild.bannerURL());
    }
    /**
     * @event guildAfkChannelAdd
     * @description Emitted when a guild afk channel is added.
     * @param {DJS:Guild} guild The guild whose afk channel has been added.
     * @param {string} afkChannel The afk channel.
     * @example
     * client.on("guildAfkChannelAdd", (guild, afkChannel) => {
     *   console.log(guild.name+" has an AFK channel now!");
     * });
     */
    if (!oldGuild.afkChannel && newGuild.afkChannel) {
        client.emit('guildAfkChannelAdd', newGuild, newGuild.afkChannel);
    }
}
