import { Channel, Client, ThreadChannel, Constants } from 'discord.js';

/**
 * @handler Thread Channel Events
 * @related threadUpdate
 */
export async function handleThreadChannelUpdateEvent(
    client: Client,
    oldThread: ThreadChannel,
    newThread: ThreadChannel,
) {
    let emitted = false;

    if (Object.prototype.hasOwnProperty.call(oldThread, 'guild')) {
        /**
         * @event threadStateUpdate
         * @description Emitted when thread is either archived or unarchived.
         * @param {DJS:ThreadChannel} oldThread The old thread channel before state update.
         * @param {DJS:ThreadChannel} newThread The new thread channel after state update.
         * @example
         * client.on("threadStateUpdate", (oldThread, newThread) => {
         *   console.log(`${newThread.name} is now ${newThread.archived ? "archived" : "unarchived"}`);
         * });
         */
        if (oldThread.archived !== newThread.archived) {
            client.emit('threadStateUpdate', oldThread, newThread);
            emitted = true;
        }

        /**
         * @event threadNameUpdate
         * @description Emitted when thread's name is updated.
         * @param {DJS:ThreadChannel} thread The thread channel who's name was updated.
         * @param {String} oldName The old name of the thread.
         * @param {String} newName The new name of the thread.
         * @example
         * client.on("threadNameUpdate", (thread, oldName, newName) => {
         *   console.log(oldName + "'s name is updated to " + newName);
         * });
         */
        if (oldThread.name !== newThread.name) {
            client.emit('threadNameUpdate', newThread, oldThread.name, newThread.name);
            emitted = true;
        }

        /**
         * @event threadLockStateUpdate
         * @description Emitted when thread is either locked or unlocked.
         * @param {DJS:ThreadChannel} oldThread The old thread channel before lock state update.
         * @param {DJS:ThreadChannel} newThread The new thread channel after lock state update.
         * @example
         * client.on("threadLockStateUpdate", (oldThread, newThread) => {
         *   console.log(`${newThread.name} is now ${newThread.locked ? "locked" : "unlocked"}`);
         * });
         */
        if (oldThread.locked !== newThread.locked) {
            client.emit('threadLockStateUpdate', oldThread, newThread);
            emitted = true;
        }

        /**
         * @event threadRateLimitPerUserUpdate
         * @description Emitted when thread's slowmode is updated.
         * @param {DJS:ThreadChannel} thread The thread channel who's rate limit per user got updated.
         * @param {Number} oldRateLimitPerUser Thread channel's old rate limit per user in seconds.
         * @param {Number} newRateLimitPerUser Thread channel's new rate limit per user in seconds.
         * @example
         * client.on("threadRateLimitPerUserUpdate", (thread, oldRateLimitPerUser, newRateLimitPerUser) => {
         *   console.log(`${thread.name}'s slowmode got changed from ${oldRateLimitPerUser ? oldRateLimitPerUser : 0} seconds to ${newRateLimitPerUser ? newRateLimitPerUser : 0} seconds.`);
         * });
         */
        if (oldThread.rateLimitPerUser !== newThread.rateLimitPerUser) {
            client.emit(
                'threadRateLimitPerUserUpdate',
                newThread,
                oldThread.rateLimitPerUser,
                newThread.rateLimitPerUser,
            );
            emitted = true;
        }

        /**
         * @event threadAutoArchiveDurationUpdate
         * @description Emitted when thread's auto archive duration is updated.
         * @param {DJS:ThreadChannel} thread The thread channel who's auto archive duration got updated.
         * @param {Number} oldAutoArchiveDuration Thread channel's old auto archive duration in minutes.
         * @param {Number} newAutoArchiveDuration Thread channel's new auto archive duration in minutes.
         * @example
         * client.on("threadAutoArchiveDurationUpdate", (thread, oldAutoArchiveDuration, newAutoArchiveDuration) => {
         *   console.log(thread.name+"'s auto archive duration got changed from " + oldAutoArchiveDuration + " minutes to " + newAutoArchiveDuration + " minutes.");
         * });
         */
        if (oldThread.autoArchiveDuration !== newThread.autoArchiveDuration) {
            client.emit(
                'threadAutoArchiveDurationUpdate',
                newThread,
                oldThread.autoArchiveDuration,
                newThread.autoArchiveDuration,
            );
            emitted = true;
        }
    }

    /**
     * @event unhandledThreadUpdate
     * @description Emitted when the threadUpdate event is triggered but discord-logs didn't trigger any custom event.
     * @param {DJS:ThreadChannel} oldThread The thread before the update.
     * @param {DJS:ThreadChannel} newThread The thread after the update.
     * @example
     * client.on("unhandledThreadUpdate", (oldThread, newThread) => {
     *   console.log("Thread "+oldThread.id+" was edited but discord-logs couldn't find what was updated...");
     * });
     */
    if (!emitted) {
        client.emit('unhandledThreadUpdate', oldThread, newThread);
    }
}
