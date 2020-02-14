import { Client, User } from 'discord.js';

export async function handleUserUpdateEvent(client: Client, oldUser: User, newUser: User) {
    // Check if the avatar has changed
    if (oldUser.displayAvatarURL() !== newUser.displayAvatarURL()) {
        return client.emit('userAvatarUpdate', oldUser, newUser);
    }
    // Check if the username has changed
    if (oldUser.username !== newUser.username) {
        return client.emit('userUsernameUpdate', oldUser, newUser);
    }
}
