import { Client, User } from 'discord.js';

/**
 * @handler User Events
 * @related userUpdate
 */
export async function handleUserUpdateEvent(client: Client, oldUser: User, newUser: User) {
    /**
     * @event userAvatarUpdate
     * @description Emitted when a user changes their avatar.
     * @param {DJS:User} user The user who changed their avatar.
     * @param {string} oldAvatarURL The old avatar url.
     * @param {string} newAvatarURL The new avatar url.
     * @example
     * client.on("userAvatarUpdate", (user, oldAvatarURL, newAvatarURL) => {
     *   console.log(user.tag+" avatar updated!");
     * });
     */
    if (oldUser.displayAvatarURL() !== newUser.displayAvatarURL()) {
        return client.emit('userAvatarUpdate', newUser, oldUser.displayAvatarURL(), newUser.displayAvatarURL());
    }
    /**
     * @event userUsernameUpdate
     * @description Emitted when a user changes their username.
     * @param {DJS:User} user The user who changed their username.
     * @param {string} oldUsername The old username.
     * @param {string} newUsername The new username.
     * @example
     * client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {
     *   console.log(user.tag+" username updated!");
     * });
     */
    if (oldUser.username !== newUser.username) {
        return client.emit('userUsernameUpdate', newUser, oldUser.username, newUser.username);
    }
    /**
     * @event userDiscriminatorUpdate
     * @description Emitted when a user changes their discriminator.
     * @param {DJS:User} user The user who changed their discriminator.
     * @param {string} oldDiscriminator The old discriminator.
     * @param {string} newDiscriminator The new discriminator.
     * @example
     * client.on("userUsernameUpdate", (user, oldDiscriminator, newDiscriminator) => {
     *   console.log(user.tag+" discriminator updated!");
     * });
     */
    if (oldUser.discriminator !== newUser.discriminator) {
        return client.emit('userDiscriminatorUpdate', newUser, oldUser.discriminator, newUser.discriminator);
    }
}
