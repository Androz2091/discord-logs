/**
 * Handles the guildMemberUpdate event and emits the specific event
 * @param {Client} client The Discord Client instance
 * @param {GuildMember} oldMember The member without the change
 * @param {GuildMember} newMember The member with the change
 */
const handleGuildMemberUpdateEvent = (client, oldMember, newMember) => {
    let addedRole = null;
    // Check if a role was added
    newMember.roles.cache.forEach((role) => {
        if(!oldMember.roles.cache.has(role.id)){
            addedRole = role;
        }
    });
    if(addedRole){
        return client.emit('guildMemberRoleAdd', oldMember, addedRole)
    }
    // Check if a role was removed
    let removedRole = null;
    oldMember.roles.cache.forEach((role) => {
        if(!newMember.roles.cache.has(role.id)){
            removedRole = role;
        }
    });
    if(removedRole){
        return client.emit('guildMemberRoleRemove', oldMember, removedRole)
    }
    // Check if the nickname has changed
    if(oldMember.nickname !== newMember.nickname){
        return client.emit('guildMemberNicknameUpdate', oldMember, newMember);
    }
};

/**
 * Handles the presenceUpdate event and emits the specific event
 * @param {Client} client The Discord Client instance
 * @param {Presence} oldPresence The presence without the change
 * @param {Presence} newPresence The presence with the change
 */
const handlePresenceUpdate = (client, oldPresence, newPresence) => {
    // Check if the member is now online
    if(oldPresence.status === 'offline' && newPresence.status !== 'offline'){
        return client.emit('guildMemberOnline', oldPresence.member, newPresence.member);
    }
    // Check if the member is now offline
    if(oldPresence.status !== 'offline' && newPresence.status === 'offline'){
        return client.emit('guildMemberOffline', oldPresence.member, newPresence.member);
    }
};

/**
 * Handles the userUpdate event and emits the specific event
 * @param {Client} client The Discord Client instance
 * @param {User} oldUser The user without the change
 * @param {User} newUser The user with the change
 */
const handleUserUpdateEvent = (client, oldUser, newUser) => {
    // Check if the avatar has changed
    if(oldUser.displayAvatarURL !== newUser.displayAvatarURL){
        return client.emit('userAvatarUpdate', oldUser, newUser);
    }
    // Check if the username has changed
    if(oldUser.username !== newUser.username){
        return client.emit('userUsernameUpdate', oldUser, newUser);
    }
};

/**
 * Handles the voiceStateUpdate event and emits the specific event
 * @param {Client} client The Discord Client instance
 * @param {VoiceState} oldState The voice state without the change
 * @param {VoiceState} newState The voice state with the change
 */
const handleVoiceStateUpdateEvent = (client, oldState, newState) => {
    let oldMember = oldState.member;
    let newMember = newState.member;
    // If the member joins the voice channel
    if(!oldState.channel && newState.channel){
        return client.emit('voiceChannelJoin', oldMember, newMember);
    }
    // If the member leaves the voice channel
    if(oldState.channel && !newState.channel){
        return client.emit('voiceChannelLeave', oldMember, newMember);
    }
    // If the member changes the voice channel
    if(oldState.channel && newState.channel && (oldState.channel.id !== newState.channel.id)){
        return client.emit('voiceChannelSwitch', oldMember, newMember);
    }
    // If the member became muted
    if(!oldState.mute && newState.mute){
        return client.emit('voiceChannelMute', oldMember, newMember);
    }
    // If the member became unmuted
    if(oldState.mute && !newState.mute){
        return client.emit('voiceChannelUnmute', oldMember, newMember);
    }
};

/**
 * Handles the guildMemberUpdate event to check if the member is now a booster
 * @param {Client} client The Discord Client instance
 * @param {GuildMember} oldMember The member without the change
 * @param {GuildMember} newMember The member with the change
 */
const handleGuildMemberUpdateEventBoost = (client, oldMember, newMember) => {
    // If the member is now boosting
    if(!oldMember.premiumSince && newMember.premiumSince){
        client.emit('guildMemberBoost', newMember);
    }
};

module.exports = async (client) => {

    /* HANDLE MEMBER EVENTS */
    client.on('guildMemberUpdate', (oldMember, newMember) => {
        handleGuildMemberUpdateEvent(client, oldMember, newMember);
        handleGuildMemberUpdateEventBoost(client, oldMember, newMember);
    });

    /* HANDLE PRESENCE UPDATE EVENTS */
    client.on('presenceUpdate', (oldPresence, newPresence) => {
        handlePresenceUpdate(client, oldPresence, newPresence);
    });

    /* HANDLE USER EVENTS */
    client.on('userUpdate', (oldUser, newUser) => {
        handleUserUpdateEvent(client, oldUser, newUser);
    });

    /* HANDLE VOICE STATE UPDATE */
    client.on('voiceStateUpdate', (oldState, newState) => {
        handleVoiceStateUpdateEvent(client, oldState, newState);
    });

};