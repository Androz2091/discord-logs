import { Client, Guild } from 'discord.js';

/**
 * @handler Guild Events
 * @related guildUpdate
 */
export async function handleGuildUpdateEvent(client: Client, oldGuild: Guild, newGuild: Guild) {
    let emitted = false;
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
        emitted = true;
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
        emitted = true;
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
        emitted = true;
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
        emitted = true;
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
        emitted = true;
    }

    /**
     * @event guildVanityURLAdd
     * @description Emitted when a guild adds a vanity url.
     * @param {DJS:Guild} guild The guild which added a vanity url.
     * @param {string} vanityURL The vanity url.
     * @example
     * client.on("guildVanityURLAdd", (guild, vanityURL) => {
     *   console.log(guild.name+" has added a vanity url : "+vanityURL);
     * });
     */
    if (!oldGuild.vanityURLCode && newGuild.vanityURLCode) {
        client.emit('guildVanityURLAdd', newGuild, newGuild.vanityURLCode);
        emitted = true;
    }
    
        /**
     * @event guildOwnerUpdate
     * @description Emitted when a guild changes owner.
     * @param {DJS:Guild} guild The guild which changed owner.
     * @param {object} oldOwner The old owner.
     * @param {object} newOwner The new owner.
     * @example
     * client.on("guildOwnerUpdate", (guild, oldOwner, newOwner) => {
     *   console.log("The new owner of " + guild.name + "is now "+ newOwner);
     * });
     */
    if (oldGuild.ownerID !== newGuild.ownerID) {
        client.emit('guildOwnerUpdate', newGuild, oldGuild.ownerID, newGuild.ownerID);
        emitted = true;
    }

    /**
     * @event unhandledGuildUpdate
     * @description Emitted when the guildUpdate event is triggered but discord-logs didn't trigger any custom event.
     * @param {DJS:Guild} oldGuild The guild before the update.
     * @param {DJS:Guild} newGuild The guild after the update.
     * @example
     * client.on("unhandledGuildUpdate", (oldGuild, newGuild) => {
     *   console.log("Guild '"+oldGuild.id+"' was edited but discord-logs couldn't find what was updated...");
     * });
     */
    if (!emitted) {
        client.emit('unhandledGuildUpdate', oldGuild, newGuild);
    }
}
