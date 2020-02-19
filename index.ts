import { Client, Guild, GuildMember, Presence, User } from 'discord.js';
import {
    handleGuildMemberUpdateEvent,
    handleGuildUpdateEvent,
    handlePresenceUpdateEvent,
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

    /* HANDLE PRESENCE UPDATE EVENTS */
    client.on('presenceUpdate', (oldPresence: Presence, newPresence: Presence) => {
        handlePresenceUpdateEvent(client, oldPresence, newPresence);
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
