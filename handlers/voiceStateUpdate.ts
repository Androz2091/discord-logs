import { Client, VoiceState } from 'discord.js';

/**
 * @handler Voice Events
 * @related voiceStateUpdate
 */
export async function handleVoiceStateUpdateEvent(client: Client, oldState: VoiceState, newState: VoiceState) {
    let emitted = false;
    const oldMember = oldState.member;
    const newMember = newState.member;
    /**
     * @event voiceChannelJoin
     * @description Emitted when a member joins a voice channel.
     * @param {DJS:GuildMember} member The member who joined the voice channel.
     * @param {DJS:VoiceChannel} voiceChannel The joined voice channel.
     * @example
     * client.on("voiceChannelJoin", (member, channel) => {
     *   console.log(member.user.tag+" joined "+channel.name+"!");
     * });
     */
    if (!oldState.channel && newState.channel) {
        client.emit('voiceChannelJoin', newMember, newState.channel);
        emitted = true;
    }
    /**
     * @event voiceChannelLeave
     * @description Emitted when a member leaves a voice channel.
     * @param {DJS:GuildMember} member The member who left the voice channel.
     * @param {DJS:VoiceChannel} voiceChannel The left voice channel.
     * @example
     * client.on("voiceChannelLeave", (member, channel) => {
     *   console.log(member.user.tag+" left "+channel.name+"!");
     * });
     */
    if (oldState.channel && !newState.channel) {
        client.emit('voiceChannelLeave', newMember, oldState.channel);
        emitted = true;
    }
    /**
     * @event voiceChannelSwitch
     * @description Emitted when a member switches to another voice channel.
     * @param {DJS:GuildMember} member The member who switched to another voice channel.
     * @param {DJS:VoiceChannel} voiceChannel The old voice channel.
     * @param {DJS:VoiceChannel} voiceChannel The new voice channel.
     * @example
     * client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {
     *   console.log(member.user.tag+" left "+oldChannel.name+" and joined "+newChannel.name+"!");
     * });
     */
    if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
        client.emit('voiceChannelSwitch', newMember, oldState.channel, newState.channel);
        emitted = true;
    }
    /**
     * @event voiceChannelMute
     * @description Emitted when a member becomes muted (self-muted or server-muted).
     * @param {DJS:GuildMember} member The member who became muted.
     * @param {boolean} muteType The mute type. It can be "self-muted" or "server-muted".
     * @example
     * client.on("voiceChannelMute", (member, muteType) => {
     *   console.log(member.user.tag+" become muted! (type: "+muteType);
     * });
     */
    if (!oldState.mute && newState.mute) {
        const muteType: string = newState.selfMute ? 'self-muted' : 'server-muted';
        client.emit('voiceChannelMute', newMember, muteType);
        emitted = true;
    }
    /**
     * @event voiceChannelUnmute
     * @description Emitted when a member becomes unmuted.
     * @param {DJS:GuildMember} member The member who became unmuted.
     * @param {boolean} muteType The old mute type. It can be "self-muted" or "server-muted".
     * @example
     * client.on("voiceChannelUnmute", (member, oldMuteType) => {
     *   console.log(member.user.tag+" become unmuted!");
     * });
     */
    if (oldState.mute && !newState.mute) {
        const muteType: string = oldState.selfMute ? 'self-muted' : 'server-muted';
        client.emit('voiceChannelUnmute', newMember, muteType);
        emitted = true;
    }
    /**
     * @event voiceChannelDeaf
     * @description Emitted when a member becomes deafed.
     * @param {DJS:GuildMember} member The member who became deafed.
     * @param {boolean} deafType The deaf type. It can be "self-deafed" or "server-deafed".
     * @example
     * client.on("voiceChannelDeaf", (member, deafType) => {
     *   console.log(member.user.tag+" become deafed!");
     * });
     */
    if (!oldState.deaf && newState.deaf) {
        const deafType: string = newState.selfDeaf ? 'self-deafed' : 'server-v';
        client.emit('voiceChannelDeaf', newMember, deafType);
        emitted = true;
    }
    /**
     * @event voiceChannelUndeaf
     * @description Emitted when a member becomes undeafed.
     * @param {DJS:GuildMember} member The member who became undeafed.
     * @param {boolean} deafType The deaf type. It can be "self-deafed" or "server-deafed".
     * @example
     * client.on("voiceChannelUndeaf", (member, deafType) => {
     *   console.log(member.user.tag+" become undeafed!");
     * });
     */
    if (oldState.deaf && !newState.deaf) {
        const deafType: string = oldState.selfDeaf ? 'self-deafed' : 'server-v';
        client.emit('voiceChannelUndeaf', newMember, deafType);
        emitted = true;
    }
    /**
     * @event voiceStreamingStart
     * @description Emitted when a member starts streaming.
     * @param {DJS:GuildMember} member The member who started streaming.
     * @param {DJS:VoiceChannel} voiceChannel The channel in which the member is streaming.
     * @example
     * client.on("voiceStreamingStart", (member, voiceChannel) => {
     *   console.log(member.user.tag+" started streaming in "+voiceChannel.name);
     * });
     */
    if (!oldState.streaming && newState.streaming) {
        client.emit('voiceStreamingStart', newMember, newState.channel);
        emitted = true;
    }
    /**
     * @event voiceStreamingStop
     * @description Emitted when a member stops streaming.
     * @param {DJS:GuildMember} member The member who stopped streaming.
     * @param {DJS:VoiceChannel} voiceChannel The channel in which the member was streaming.
     * @example
     * client.on("voiceStreamingStop", (member, voiceChannel) => {
     *   console.log(member.user.tag+" stopped streaming");
     * });
     */
    if (oldState.streaming && !newState.streaming) {
        client.emit('voiceStreamingStop', newMember, newState.channel);
        emitted = true;
    }
    /**
     * @event unhandledVoiceStateUpdate
     * @description Emitted when the voiceStateUpdate event is triggered but discord-logs didn't trigger any custom event.
     * @param {DJS:VoiceState} oldState The voice state before the update.
     * @param {DJS:VoiceState} newState The voice state after the update.
     * @example
     * client.on("unhandledVoiceStateUpdate", (oldState, newState) => {
     *   console.log("Voice state for member '"+oldState.member.user.tag+"' was updated but discord-logs couldn't find what was updated...");
     * });
     */
    if (!emitted) {
        client.emit('unhandledVoiceStateUpdate', oldState, newState);
    }
}
