import { Client, GuildMember, PartialGuildMember, Role } from 'discord.js';

/**
 * @handler Guild Member Events
 * @related guildMemberUpdate
 */
export async function handleGuildMemberUpdateEvent(
    client: Client,
    oldMember: GuildMember | PartialGuildMember,
    newMember: GuildMember,
) {
    let emitted = false;

    if (!oldMember.partial) {
        /**
         * @event guildMemberBoost
         * @description Emitted when a member starts boosting.
         * @param {DJS:GuildMember} member The member who started boosting.
         * @example
         * client.on("guildMemberBoost", (member) => {
         *   console.log(member.user.tag+" has started boosting "+member.guild.name+"!");
         * });
         */
        if (!oldMember.premiumSince && newMember.premiumSince) {
            client.emit('guildMemberBoost', newMember);
            emitted = true;
        }
        /**
         * @event guildMemberUnboost
         * @description Emitted when a member stops boosting.
         * @param {DJS:GuildMember} member The member who stopped boosting.
         * @example
         * client.on("guildMemberUnboost", (member) => {
         *   console.log(member.user.tag+" has stopped boosting "+member.guild.name+"...");
         * });
         */
        if (oldMember.premiumSince && !newMember.premiumSince) {
            client.emit('guildMemberUnboost', newMember);
            emitted = true;
        }
        const addedRoles: Role[] = [];
        newMember.roles.cache.forEach((role) => {
            if (!oldMember.roles.cache.has(role.id)) addedRoles.push(role);
        });
        /**
         * @event guildMemberRoleAdd
         * @description Emitted when a member acquires a new role.
         * @param {DJS:GuildMember} member The member who acquired the role.
         * @param {DJS:Role} role The role the member has acquired.
         * @example
         * client.on("guildMemberRoleAdd", (member, role) => {
         *   console.log(member.user.tag+" acquired the role: "+role.name);
         * });
         */
        addedRoles.forEach((role) => {
            client.emit('guildMemberRoleAdd', oldMember, role);
            emitted = true;
        });
        const removedRoles: Role[] = [];
        oldMember.roles.cache.forEach((role) => {
            if (!newMember.roles.cache.has(role.id)) removedRoles.push(role);
        });
        /**
         * @event guildMemberRoleRemove
         * @description Emitted when a member looses a new role.
         * @param {DJS:GuildMember} member The member who lost the role.
         * @param {DJS:Role} role The role the member has lost.
         * @example
         * client.on("guildMemberRoleRemove", (member, role) => {
         *   console.log(member.user.tag+" lost the role: "+role.name);
         * });
         */
        removedRoles.forEach((role) => {
            client.emit('guildMemberRoleRemove', oldMember, role);
            emitted = true;
        });
        /**
         * @event guildMemberNicknameUpdate
         * @description Emitted when a member's nickname changes.
         * @param {DJS:GuildMember} member The member whose nickname has changed.
         * @param {string} oldNickname The member's old nickname.
         * @param {string} newNickname The member's new nickname.
         * @example
         * client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
         *   console.log(member.user.tag+"'s nickname is now "+newNickname);
         * });
         */
        if (oldMember.nickname !== newMember.nickname) {
            client.emit('guildMemberNicknameUpdate', newMember, oldMember.nickname, newMember.nickname);
            emitted = true;
        }
        /**
         * @event guildMemberTimeout
         * @description Emitted when the member has been timed out.
         * @param {DJS:GuildMember} member The member whose passed the gate of the guild
         * @param {Date} disabledUntil The timestamp the member has been disabled until, null if the member is not disabled
         * @example
         * client.on("guildMemberTimeout", (member, disabledUntil) => {
         *   console.log(`${member.user.tag} has been disabled until ${disabledUntil}`);
         * });
         */
        if (oldMember.communicationDisabledUntil !== newMember.communicationDisabledUntil) {
            client.emit('guildMemberTimeout', newMember, newMember.communicationDisabledUntil);
            emitted = true;
        }
        /**
         * @event guildMemberTimeout
         * @description Emitted when the member has been timed out.
         * @param {DJS:GuildMember} member The member whose passed the gate of the guild
         * @param {Date} disabledUntil The timestamp the member has been disabled until, null if the member is not disabled
         * @example
         * client.on("guildMemberCommunicationDisabled", (member, disabledUntil) => {
         *   console.log(`${member.user.tag} has been disabled until ${disabledUntil}`);
         * });
         */
        if (oldMember.communicationDisabledUntil !== newMember.communicationDisabledUntil) {
            client.emit('guildMemberTimeout', newMember, newMember.communicationDisabledUntil);
            emitted = true;
        }
        /**
         * @event guildMemberEntered
         * @description Emitted when the member has passed the gate of the guild
         * @param {DJS:GuildMember} member The member whose passed the gate of the guild
         * @example
         * client.on("guildMemberEntered", (member) => {
         *   console.log(member.user.tag+" has passed the gate!");
         * });
         */
         if (oldMember.pending !== newMember.pending) {
            client.emit('guildMemberEntered', newMember);
            emitted = true;
        }
    }

    /**
     * @event unhandledGuildMemberUpdate
     * @description Emitted when the guildMemberUpdate event is triggered but discord-logs didn't trigger any custom event.
     * @param {DJS:Guild} oldMember The member before the update.
     * @param {DJS:Guild} newMember The member after the update.
     * @example
     * client.on("unhandledGuildMemberUpdate", (oldMember, newMember) => {
     *   console.log("Member '"+oldMember.id+"' was edited but discord-logs couldn't find what was updated...");
     * });
     */
    if (!emitted) {
        client.emit('unhandledGuildMemberUpdate', oldMember, newMember);
    }
}
