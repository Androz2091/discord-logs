import { Client, VoiceState } from 'discord.js';

/**
 * @handler Voice Events
 * @related voiceStateUpdate
 */
export async function handleVoiceStateUpdateEvent(client: Client, oldState: VoiceState, newState: VoiceState) {
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
    }
    /**
     * @event voiceChannelUnmute
     * @description Emitted when a member becomes unmuted.
     * @param {DJS:GuildMember} member The member who became unmuted.
     * @param {boolean} muteType The old mute type. It can be "self-muted" or "server-muted".
     * @example
     * client.on("voiceChannelMute", (member, oldMuteType) => {
     *   console.log(member.user.tag+" become unmuted!");
     * });
     */
    if (oldState.mute && !newState.mute) {
        const muteType: string = oldState.selfMute ? 'self-muted' : 'server-muted';
        client.emit('voiceChannelUnmute', newMember, muteType);
    }
    /**
     * @event voiceChannelDeaf
     * @description Emitted when a member becomes deafed.
     * @param {DJS:GuildMember} member The member who became deafed.
     * @param {boolean} deafType The deaf type. It can be "self-deafed" or "server-deafed".
     * @example
     * client.on("voiceChannelDeaf", (member, deafType) => {
     *   console.log(member.user.tag+" become deafed!);
     * });
     */
    if (!oldState.deaf && newState.deaf) {
        const deafType: string = newState.selfDeaf ? 'self-deafed' : 'server-v';
        client.emit('voiceChannelDeaf', newMember, deafType);
    }
    /**
     * @event voiceChannelUndeaf
     * @description Emitted when a member becomes undeafed.
     * @param {DJS:GuildMember} member The member who became undeafed.
     * @param {boolean} deafType The deaf type. It can be "self-deafed" or "server-deafed".
     * @example
     * client.on("voiceChannelUneaf", (member, deafType) => {
     *   console.log(member.user.tag+" become undeafed!");
     * });
     */
    if (oldState.deaf && !newState.deaf) {
        const deafType: string = oldState.selfDeaf ? 'self-deafed' : 'server-v';
        client.emit('voiceChannelUndeaf', newMember, deafType);
    }
     /**
     * @event voiceStreamingStart
     * @description Emitted when a member start stream.
     * @param {DJS:GuildMember} member The member who is streaming.
     * @example
     * client.on("voiceStreamingStart", (member, channel) => {
     *   console.log(member.user.tag+" started stream in "+channel.name);
     * });
     */
    if (!oldState.streaming && newState.streaming) {  
        client.emit('voiceStreamingStart', newMember, newState.channel);
    }
    /**
     * @event voiceStreamingStop
     * @description Emitted when a member stop stream
     * @param {DJS:GuildMember} member The member who stoped stream.
     * @example
     * client.on("voiceStreamingStop", (member, channel) => {
     *   console.log(member.user.tag+" stoped stream");
     * });
     */
    if (oldState.streaming && !newState.streaming) {  
        client.emit('voiceStreamingStop', newMember, newState.channel);
    }
    /**
     * @event voiceSpeakingStart
     * @description Emitted when a member is speaking.
     * @param {DJS:GuildMember} member The member who is speaking.  
     * @example
     * client.on("voiceSpeakingStart", (member, channel) => {
     *   console.log(member.user.tag+" started speak in "+channel.name);
     * });
     */
    if (!oldState.speaking && newState.speaking) {  
        client.emit('voiceSpeakingStart', newMember, newState.channel);
    }
}
