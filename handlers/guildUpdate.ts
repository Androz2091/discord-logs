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
     * @event guildVanityURLRemove
     * @description Emitted when a guild removes its vanity URL.
     * @param {DJS:Guild} guild The guild which removed its vanity URL.
     * @param {string} vanityURL The vanity url.
     * @example
     * client.on("guildVanityURLRemove", (guild, vanityURL) => {
     *   console.log(guild.name+" has removed its vanity url : "+vanityURL);
     * });
     */
    if (oldGuild.vanityURLCode && !newGuild.vanityURLCode) {
        client.emit('guildVanityURLRemove', newGuild, oldGuild.vanityURLCode);
        emitted = true;
    }

    /**
     * @event guildVanityURLUpdate
     * @description Emitted when a guild updates its vanity URL.
     * @param {DJS:Guild} guild The guild which updated a vanity URL.
     * @param {string} oldVanityURL The former vanity URL.
     * @param {string} vanityURL The updated vanity URL.
     * @example
     * client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {
     *   console.log(`${guild.name} has changed its vanity URL from ${oldGuildvanityURL} to ${newGuildvanityURL} !`);
     * });
     */
    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
        client.emit('guildVanityURLUpdate', newGuild, oldGuild.vanityURLCode, newGuild.vanityURLCode);
        emitted = true;
    }

    /**
     * @event guildFeaturesUpdate
     * @description Emitten when a guild feature gets updated.
     * @param {DJS:Guild} oldGuild The guild before its feature(s) were updated.
     * @param {DJS:Guild} newGuild The guild after its feature(s) were updated.
     * @example
     * client.on("guildFeaturesUpdate", (oldGuild, newGuild) => {
     *   console.log(`New features: ${newGuild.features.join(", ")}`);
     * });
     */
    if (oldGuild.features.length !== newGuild.features.length) {
        client.emit('guildFeaturesUpdate', oldGuild, newGuild);
        emitted = true;
    }

    /**
     * @event guildAcronymUpdate
     * @description Emitted when a guild updates its Acronym.
     * @param {DJS:Guild} oldGuild The guild before its Acronym was updated.
     * @param {DJS:Guild} newGuild The guild after its Acronym was updated.
     * @example
     * client.on("guildAcronymUpdate", (oldGuild, newGuild) => {
     *   console.log(oldGuild.name+" updated its Acronym : "+newGuild.nameAcronym);
     * });
     */
    if (oldGuild.nameAcronym !== newGuild.nameAcronym) {
        client.emit('guildAcronymUpdate', oldGuild, newGuild);
        emitted = true;
    }

    /**
     * @event guildOwnerUpdate
     * @description Emitted when a guild updates its owner.
     * @param {DJS:Guild} oldGuild The guild before its owner was updated.
     * @param {DJS:Guild} newGuild The guild after its owner was updated.
     * @example
     * client.on("guildOwnerUpdate", (oldGuild, newGuild) => {
     *   console.log(oldGuild.name+" updated its owner : "+newGuild.owner.id);
     * });
     */
    if (oldGuild.ownerId !== newGuild.ownerId) {
        client.emit('guildOwnerUpdate', oldGuild, newGuild);
        emitted = true;
    }

    /**
     * @event guildPartnerAdd
     * @description Emitted when a guild gets partnered.
     * @param {DJS:Guild} guild The guild who partnered.
     * @example
     * client.on("guildPartnerAdd", (guild) => {
     *   console.log(guild.name+" got partnered!");
     * });
     */
    if (!oldGuild.partnered && newGuild.partnered) {
        client.emit('guildPartnerAdd', newGuild);
        emitted = true;
    }

    /**
     * @event guildPartnerRemove
     * @description Emitted when a guild is no longer partnered.
     * @param {DJS:Guild} guild The guild who removed partnership.
     * @example
     * client.on("guildPartnerRemove", (guild) => {
     *   console.log(guild.name+" is no longer partnered!");
     * });
     */
    if (oldGuild.partnered && !newGuild.partnered) {
        client.emit('guildPartnerRemove', newGuild);
        emitted = true;
    }

    /**
     * @event guildVerificationAdd
     * @description Emitted when a guild gets verified.
     * @param {DJS:Guild} guild The guild who got verified.
     * @example
     * client.on("guildVerificationAdd", (guild) => {
     *   console.log(guild.name+" got verified!");
     * });
     */
    if (!oldGuild.verified && newGuild.verified) {
        client.emit('guildVerificationAdd', newGuild);
        emitted = true;
    }

    /**
     * @event guildVerificationRemove
     * @description Emitted when a guild is no longer verified.
     * @param {DJS:Guild} guild The guild who is no longer verified.
     * @example
     * client.on("guildVerificationRemove", (guild) => {
     *   console.log(guild.name+" is no longer verified!");
     * });
     */
    if (oldGuild.verified && !newGuild.verified) {
        client.emit('guildVerificationRemove', newGuild);
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
