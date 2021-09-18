import { Client, PartialUser, User } from 'discord.js';

/**
 * @handler User Events
 * @related userUpdate
 */
export async function handleUserUpdateEvent(client: Client, oldUser: User | PartialUser, newUser: User) {
    let emitted = false;

    if (!oldUser.partial) {
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
            client.emit('userAvatarUpdate', newUser, oldUser.displayAvatarURL(), newUser.displayAvatarURL());
            emitted = true;
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
            client.emit('userUsernameUpdate', newUser, oldUser.username, newUser.username);
            emitted = true;
        }
        /**
         * @event userDiscriminatorUpdate
         * @description Emitted when a user changes their discriminator.
         * @param {DJS:User} user The user who changed their discriminator.
         * @param {string} oldDiscriminator The old discriminator.
         * @param {string} newDiscriminator The new discriminator.
         * @example
         * client.on("userDiscriminatorUpdate", (user, oldDiscriminator, newDiscriminator) => {
         *   console.log(user.tag+" discriminator updated!");
         * });
         */
        if (oldUser.discriminator !== newUser.discriminator) {
            client.emit('userDiscriminatorUpdate', newUser, oldUser.discriminator, newUser.discriminator);
            emitted = true;
        }

        /**
         * @event userFlagsUpdate
         * @description Emitted when a user changes their flags.
         * @param {DJS:User} user The user who changed their flags.
         * @param {string} oldFlags The old flags.
         * @param {string} newFlags The new flags.
         * @example
         * client.on("userFlagsUpdate", (user, oldFlags, newFlags) => {
         *   console.log(user.tag+" flags updated!");
         * });
         */
        if (oldUser.flags !== newUser.flags) {
            client.emit('userFlagsUpdate', newUser, oldUser.flags, newUser.flags);
            emitted = true;
        }
    }

    /**
     * @event unhandledUserUpdate
     * @description Emitted when the userUpdate event is triggered but discord-logs didn't trigger any custom event.
     * @param {DJS:User} oldUser The user before the update.
     * @param {DJS:User} newUser The user after the update.
     * @example
     * client.on("unhandledUserUpdate", (oldUser, newUser) => {
     *   console.log("User '"+oldUser.id+"' was updated but discord-logs couldn't find what was updated...");
     * });
     */
    if (!emitted) {
        client.emit('unhandledUserUpdate', oldUser, newUser);
    }
}
