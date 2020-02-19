import { Client, GuildMember, Role } from 'discord.js';

/**
 * @handler Guild Member Events
 * @related guildMemberUpdate
 */
export async function handleGuildMemberUpdateEvent(client: Client, oldMember: GuildMember, newMember: GuildMember) {
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
    }
    /**
     * @event guildMemberUnboost
     * @description Emitted when a member stops boosting.
     * @param {DJS:GuildMember} member The member who stopped boosting.
     * @example
     * client.on("guildMemberBoost", (member) => {
     *   console.log(member.user.tag+" has stopped boosting "+member.guild.name+"...");
     * });
     */
    if (oldMember.premiumSince && !newMember.premiumSince) {
        client.emit('guildMemberUnboost', newMember);
    }
    const addedRoles: Role[] = [];
    newMember.roles.cache.forEach(role => {
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
    addedRoles.forEach(role => client.emit('guildMemberRoleAdd', oldMember, role));
    const removedRoles: Role[] = [];
    oldMember.roles.cache.forEach(role => {
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
    removedRoles.forEach(role => client.emit('guildMemberRoleRemove', oldMember, role));
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
    }
}
