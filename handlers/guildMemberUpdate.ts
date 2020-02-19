import { Client, GuildMember, Role } from 'discord.js';

export async function handleGuildMemberUpdateEvent(client: Client, oldMember: GuildMember, newMember: GuildMember) {
    // If the member has started boosting
    if (!oldMember.premiumSince && newMember.premiumSince) {
        client.emit('guildMemberBoost', newMember);
    }
    // If the member has stopped boosting
    if (oldMember.premiumSince && !newMember.premiumSince) {
        client.emit('guildMemberUnboost', newMember);
    }
    const addedRoles: Role[] = [];
    // If the member has acquired new roles
    newMember.roles.cache.forEach(role => {
        if (!oldMember.roles.cache.has(role.id)) addedRoles.push(role);
    });
    addedRoles.forEach(role => client.emit('guildMemberRoleAdd', oldMember, role));
    // If the member has lost roles
    const removedRoles: Role[] = [];
    oldMember.roles.cache.forEach(role => {
        if (!newMember.roles.cache.has(role.id)) removedRoles.push(role);
    });
    removedRoles.forEach(role => client.emit('guildMemberRoleRemove', oldMember, role));
    // If the member's nickname has changed
    if (oldMember.nickname !== newMember.nickname) {
        client.emit('guildMemberNicknameUpdate', oldMember, newMember);
    }
}
