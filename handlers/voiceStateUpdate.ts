import { Client, VoiceState } from 'discord.js';

export async function handleVoiceStateUpdateEvent(client: Client, oldState: VoiceState, newState: VoiceState) {
    const oldMember = oldState.member;
    const newMember = newState.member;
    // If the member joins the voice channel
    if (!oldState.channel && newState.channel) {
        client.emit('voiceChannelJoin', oldMember, newMember);
    }
    // If the member leaves the voice channel
    if (oldState.channel && !newState.channel) {
        client.emit('voiceChannelLeave', oldMember, newMember);
    }
    // If the member changes the voice channel
    if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
        client.emit('voiceChannelSwitch', oldMember, newMember);
    }
    // If the member became muted
    if (!oldState.mute && newState.mute) {
        client.emit('voiceChannelMute', oldMember, newMember);
    }
    // If the member became unmuted
    if (oldState.mute && !newState.mute) {
        client.emit('voiceChannelUnmute', oldMember, newMember);
    }
    // If the member became deafed
    if (!oldState.deaf && newState.deaf) {
        client.emit('voiceChannelDeaf', oldMember, newMember);
    }
    // If the member became undeafed
    if (oldState.deaf && !newState.deaf) {
        client.emit('voiceChannelUndeaf', oldMember, newMember);
    }
}
