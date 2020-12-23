import { Client, Guild, GuildMember, GuildChannel, Presence, Role, User, Message } from 'discord.js';
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

export = async (client: Client) => {

    if (eventRegistered) return;
    eventRegistered = true;

    /* HANDLE CHANNEL EVENTS */
    client.on('channelUpdate', (oldChannel, newChannel) => {
        handleChannelUpdateEvent(client, oldChannel, newChannel);
    });

    /* HANDLE MEMBER EVENTS */
    client.on('guildMemberUpdate', (oldMember, newMember) => {
        handleGuildMemberUpdateEvent(client, oldMember, newMember);
    });

    /* HANDLE GUILD EVENTS */
    client.on('guildUpdate', (oldGuild, newGuild) => {
        handleGuildUpdateEvent(client, oldGuild, newGuild);
    });

    /* HANDLE MESSAGE UPDATE EVENTS */
    client.on('messageUpdate', (oldMessage, newMessage) => {
        handleMessageUpdateEvent(client, oldMessage, newMessage);
    });

    /* HANDLE PRESENCE UPDATE EVENTS */
    client.on('presenceUpdate', (oldPresence, newPresence) => {
        handlePresenceUpdateEvent(client, oldPresence, newPresence);
    });

    /* HANDLE ROLE EVENTS */
    client.on('roleUpdate', (oldRole, newRole) => {
        handleRoleUpdateEvent(client, oldRole, newRole);
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
