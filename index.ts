import { Client, IntentsBitField } from 'discord.js';
import {
    handleGuildMemberUpdateEvent,
    handleGuildUpdateEvent,
    handleMessageUpdateEvent,
    handlePresenceUpdateEvent,
    handleRoleUpdateEvent,
    handleUserUpdateEvent,
    handleVoiceStateUpdateEvent,
    handleChannelUpdateEvent,
    handleThreadChannelUpdateEvent,
} from './handlers';

let eventRegistered = false;

export = async (client: Client, options?: { debug?: boolean, force?: boolean }) => {
    if (eventRegistered && !options?.force) return;
    eventRegistered = true;

    const intents = new IntentsBitField(client.options.intents);

    /* HANDLE GUILDS EVENTS */
    if (intents.has(IntentsBitField.Flags.Guilds)) {
        if (options?.debug) console.log('channelUpdate event handler registered.');
        client.on('channelUpdate', (oldChannel, newChannel) => {
            handleChannelUpdateEvent(client, oldChannel, newChannel);
        });
        if (options?.debug) console.log('guildUpdate event handler registered.');
        client.on('guildUpdate', (oldGuild, newGuild) => {
            handleGuildUpdateEvent(client, oldGuild, newGuild);
        });
        if (options?.debug) console.log('roleUpdate event handler registered.');
        client.on('roleUpdate', (oldRole, newRole) => {
            handleRoleUpdateEvent(client, oldRole, newRole);
        });
        if (options?.debug) console.log('threadUpdate event handler registered.');
        client.on('threadUpdate', (oldThread, newThread) => {
            handleThreadChannelUpdateEvent(client, oldThread, newThread);
        });
    } else {
        if (options?.debug)
            console.log(
                'channelUpdate, guildUpdate, roleUpdate and threadUpdate event handlers not registered (missing Guilds intent).',
            );
    }

    /* HANDLE MEMBER EVENTS */
    if (intents.has(IntentsBitField.Flags.GuildMembers)) {
        if (options?.debug) console.log('guildMemberUpdate event handler registered.');
        client.on('guildMemberUpdate', (oldMember, newMember) => {
            handleGuildMemberUpdateEvent(client, oldMember, newMember);
        });
        if (options?.debug) console.log('userUpdate event handler registered.');
        client.on('userUpdate', (oldUser, newUser) => {
            handleUserUpdateEvent(client, oldUser, newUser);
        });
    } else {
        if (options?.debug)
            console.log('guildMemberUpdate, userUpdate event handlers not registered (missing GuildMembers intent).');
    }

    /* HANDLE MESSAGE UPDATE EVENTS */
    if (intents.has(IntentsBitField.Flags.GuildMessages && IntentsBitField.Flags.MessageContent)) {
        if (options?.debug) console.log('messageUpdate event handler registered.');
        client.on('messageUpdate', (oldMessage, newMessage) => {
            handleMessageUpdateEvent(client, oldMessage, newMessage);
        });
    } else {
        if (options?.debug) console.log('messageUpdate event handler not registered (missing GuildMessages or MessageContent intent).');
    }

    /* HANDLE PRESENCE UPDATE EVENTS */
    if (intents.has(IntentsBitField.Flags.GuildPresences)) {
        if (options?.debug) console.log('presenceUpdate event handler registered.');
        client.on('presenceUpdate', (oldPresence, newPresence) => {
            handlePresenceUpdateEvent(client, oldPresence, newPresence);
        });
    } else {
        if (options?.debug)
            console.log('presenceUpdate event handler not registered (missing GuildPresences intent).');
    }

    /* HANDLE VOICE STATE UPDATE */
    if (intents.has(IntentsBitField.Flags.GuildVoiceStates)) {
        if (options?.debug) console.log('voiceStateUpdate event handler registered.');
        client.on('voiceStateUpdate', (oldState, newState) => {
            handleVoiceStateUpdateEvent(client, oldState, newState);
        });
    } else {
        if (options?.debug)
            console.log('voiceStateUpdate event handler not registered (missing GuildVoiceStates intent).');
    }
};
