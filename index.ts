import { Client, Guild, GuildMember, Presence, User, Message } from 'discord.js';
import {
    handleGuildMemberUpdateEvent,
    handleGuildUpdateEvent,
    handleMessageUpdateEvent,
    handlePresenceUpdateEvent,
    handleRoleUpdateEvent,
    handleUserUpdateEvent,
    handleVoiceStateUpdateEvent,
} from './handlers';

export = async (client: Client) => {
    /* HANDLE MEMBER EVENTS */
    client.on('guildMemberUpdate', (oldMember: GuildMember, newMember: GuildMember) => {
        handleGuildMemberUpdateEvent(client, oldMember, newMember);
    });

    /* HANDLE GUILD EVENTS */
    client.on('guildUpdate', (oldGuild: Guild, newGuild: Guild) => {
        handleGuildUpdateEvent(client, oldGuild, newGuild);
    });

    /* HANDLE MESSAGE UPDATE EVENTS */
    client.on('messageUpdate', (oldMessage: Message, newMessage: Message) => {
        handleMessageUpdateEvent(client, oldMessage, newMessage);
    });

    /* HANDLE PRESENCE UPDATE EVENTS */
    client.on('presenceUpdate', (oldPresence: Presence, newPresence: Presence) => {
        handlePresenceUpdateEvent(client, oldPresence, newPresence);
    });
    
    /* HANDLE ROLE EVENTS */
    client.on('roleUpdate', (oldRole: Role, newRole: Role) => {
        handleRoleUpdateEvent(client, oldRole, newRole);
    });
    
    /* HANDLE USER EVENTS */
    client.on('userUpdate', (oldUser: User, newUser: User) => {
        handleUserUpdateEvent(client, oldUser, newUser);
    });

    /* HANDLE VOICE STATE UPDATE */
    client.on('voiceStateUpdate', (oldState, newState) => {
        handleVoiceStateUpdateEvent(client, oldState, newState);
    });
};
