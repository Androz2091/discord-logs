declare module 'discord-logs' {
    import {
        GuildChannel,
        ClientEvents,
        PermissionOverwrites,
        GuildMember,
        Role,
        Guild,
        Status,
        Presence,
        User,
        VoiceChannel,
        VoiceState,
        Client,
        Message,
    } from 'discord.js';
    export interface DiscordEvents extends ClientEvents {
        guildChannelPermissionsUpdate: [
            channel: GuildChannel,
            oldPermissions: PermissionOverwrites,
            newPermissions: PermissionOverwrites,
        ];
        guildChannelTopicUpdate: [channel: GuildChannel, oldTopic: string, newTopic: string];
        unhandledGuildChannelUpdate: [oldChannel: GuildChannel, newChannel: GuildChannel];
        guildMemberBoost: [member: GuildMember];
        guildMemberUnboost: [member: GuildMember];
        guildMemberRoleAdd: [member: GuildMember, role: Role];
        guildMemberRoleRemove: [member: GuildMember, role: Role];
        guildMemberNicknameUpdate: [member: GuildMember, oldNickname: string, newNickname: string];
        guildMemberEntered: [member: GuildMember];
        unhandledGuildMemberUpdate: [oldMember: Guild, newMember: Guild];
        guildBoostLevelUp: [guild: Guild, oldLevel: number, newLevel: number];
        guildBoostLevelDown: [guild: Guild, oldLevel: number, newLevel: number];
        guildBannerAdd: [guild: Guild, bannerURL: string];
        guildAfkChannelAdd: [guild: Guild, afkChannel: string];
        guildVanityURLAdd: [guild: Guild, vanityURL: string];
        guildVanityURLRemove: [guild: Guild, vanityURL: string];
        guildVanityURLUpdate: [guild: Guild, oldVanityURL: string, vanityURL: string];
        guildFeaturesUpdate: [oldGuild: Guild, newGuild: Guild];
        guildAcronymUpdate: [oldGuild: Guild, newGuild: Guild];
        guildOwnerUpdate: [oldGuild: Guild, newGuild: Guild];
        guildPartnerAdd: [guild: Guild];
        guildPartnerRemove: [guild: Guild];
        guildVerificationAdd: [guild: Guild];
        guildVerificationRemove: [guild: Guild];
        unhandledGuildUpdate: [oldGuild: Guild, newGuild: Guild];
        messagePinned: [message: Message];
        messageContentEdited: [message: Message, oldContent: string, newContent: string];
        unhandledMessageUpdate: [oldMessage: Message, newMessage: Message];
        guildMemberOffline: [member: GuildMember, oldStatus: Status];
        guildMemberOnline: [member: GuildMember, newStatus: Status];
        unhandledPresenceUpdate: [oldPresence: Presence, newPresence: Presence];
        rolePositionUpdate: [role: Role, oldPosition: number, newPosition: number];
        rolePermissionsUpdate: [role: Role, oldPermissions: number, newPermissions: number];
        unhandledRoleUpdate: [oldRole: Role, newRole: Role];
        userAvatarUpdate: [user: User, oldAvatarURL: string, newAvatarURL: string];
        userUsernameUpdate: [user: User, oldUsername: string, newUsername: string];
        userDiscriminatorUpdate: [user: User, oldDiscriminator: string, newDiscriminator: string];
        userFlagsUpdate: [user: User, oldFlags: string, newFlags: string];
        unhandledUserUpdate: [oldUser: User, newUser: User];
        voiceChannelJoin: [member: GuildMember, channel: VoiceChannel];
        voiceChannelLeave: [member: GuildMember, channel: VoiceChannel];
        voiceChannelSwitch: [member: GuildMember, oldChannel: VoiceChannel, newChannel: VoiceChannel];
        voiceChannelMute: [member: GuildMember, muteType: boolean];
        voiceChannelUnmute: [member: GuildMember, oldMuteType: boolean];
        voiceChannelDeaf: [member: GuildMember, deafType: boolean];
        voiceChannelUndeaf: [member: GuildMember, deafType: boolean];
        voiceStreamingStart: [member: GuildMember, voiceChannel: VoiceChannel];
        voiceStreamingStop: [member: GuildMember, voiceChannel: VoiceChannel];
        unhandledVoiceStateUpdate: [oldState: VoiceState, newState: VoiceState];
    }
    export namespace Logs {
        export function logs(client: Client, options?: { debug?: boolean }): Promise<void>;
    }
    // export = Logs;
}
