import { Client, Guild, GuildMember, GuildChannel, Presence, Role, User, Message } from 'discord.js';
import {
    handleGuildMemberUpdateEvent,
    handleGuildUpdateEvent,
    handleMessageUpdateEvent,
    handlePresenceUpdateEvent,
    handleRoleUpdateEvent,
    handleUserUpdateEvent,
    handleVoiceStateUpdateEvent,
    handleGuildChannelUpdateEvent,
} from './handlers';

export = async (client: Client) => {
    
    /* HANDLE CHANNEL EVENTS */
    client.on('guildChannelUpdate', (oldChannel: GuildChannel, newChannel: GuildChannel) => {
        handleGuildChannelUpdateEvent(client, oldChannel, newChannel);
    });
    
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
