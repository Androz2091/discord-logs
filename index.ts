import { Client, Intents } from 'discord.js';
import {
    handleGuildMemberUpdateEvent,
    handleGuildUpdateEvent,
    handleMessageUpdateEvent,
    handlePresenceUpdateEvent,
    handleRoleUpdateEvent,
    handleUserUpdateEvent,
    handleVoiceStateUpdateEvent,
    handleChannelUpdateEvent,
} from './handlers';

let eventRegistered = false;

export = async (client: Client, options?: { debug?: boolean }) => {

    if (eventRegistered) return;
    eventRegistered = true;

    const intents = new Intents(client.options.intents);

    /* HANDLE GUILDS EVENTS */
    if (intents.has('GUILDS')) {
        client.on('channelUpdate', (oldChannel, newChannel) => {
            if (options?.debug) console.log('channelUpdate event handler registered.');
            handleChannelUpdateEvent(client, oldChannel, newChannel);
        });
        client.on('guildUpdate', (oldGuild, newGuild) => {
            if (options?.debug) console.log('guildUpdate event handler registered.');
            handleGuildUpdateEvent(client, oldGuild, newGuild);
        });
        client.on('roleUpdate', (oldRole, newRole) => {
            if (options?.debug) console.log('roleUpdate event handler registered.');
            handleRoleUpdateEvent(client, oldRole, newRole);
        });
    } else {
        if (options?.debug) console.log('channelUpdate, guildUpdate and roleUpdate event handlers not registered (missing GUILDS intent).');
    }

    /* HANDLE MEMBER EVENTS */
    if (intents.has('GUILD_MEMBERS')) {
        client.on('guildMemberUpdate', (oldMember, newMember) => {
            if (options?.debug) console.log('guildMemberUpdate event handler registered.');
            handleGuildMemberUpdateEvent(client, oldMember, newMember);
        });
        client.on('userUpdate', (oldUser, newUser) => {
            if (options?.debug) console.log('userUpdate event handler registered.');
            handleUserUpdateEvent(client, oldUser, newUser);
        });
    } else {
        if (options?.debug) console.log('guildMemberUpdate, userUpdate event handlers not registered (missing GUILD_MEMBERS intents).');
    }

    /* HANDLE MESSAGE UPDATE EVENTS */
    if (intents.has('GUILD_MESSAGES')) {
        client.on('messageUpdate', (oldMessage, newMessage) => {
            if (options?.debug) console.log('messageUpdate event handler registered.');
            handleMessageUpdateEvent(client, oldMessage, newMessage);
        });
    } else {
        if (options?.debug) console.log('messageUpdate event handler not registered (missing GUILD_MESSAGES intent).');
    }

    /* HANDLE PRESENCE UPDATE EVENTS */
    if (intents.has('GUILD_PRESENCES')) {
        client.on('presenceUpdate', (oldPresence, newPresence) => {
            if (options?.debug) console.log('presenceUpdate event handler registered.');
            handlePresenceUpdateEvent(client, oldPresence, newPresence);
        });
    } else {
        if (options?.debug) console.log('presenceUpdate event handler not registered (missing GUILD_PRESENCES intent).');
    }

    /* HANDLE VOICE STATE UPDATE */
    if (intents.has('GUILD_VOICE_STATES')) {
        client.on('voiceStateUpdate', (oldState, newState) => {
            if (options?.debug) console.log('voiceStateUpdate event handler registered.');
            handleVoiceStateUpdateEvent(client, oldState, newState);
        });
    } else {
        if (options?.debug) console.log('voiceStateUpdate event handler not registered (missing GUILD_VOICE_STATES intent).');
    }

};
