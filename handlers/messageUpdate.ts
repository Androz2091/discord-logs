import { Client, Message } from 'discord.js';

/**
 * @handler Message Events
 * @related messageUpdate
 */
export async function handleMessageUpdateEvent(client: Client, oldMessage: Message, newMessage: Message) {
    /**
     * @event messagePinned
     * @description Emitted when a message has been pinned.
     * @param {DJS:Message} message The message that was pinned.
     * @example
     * client.on("messagePinned", (message) => {
     *   console.log("This message has been pinned : "+message);
     * });
     */
    if (!oldMessage.pinned && newMessage.pinned) {
        client.emit('messagePinned', newMessage);
    }
       /**
     * @event messageDeleted
     * @description Emitted when a message has been deleted.
     * @param {DJS:Message} message The message that was deleted.
     * @example
     * client.on("messageDeleted", (message) => {
     *   console.log("This message has been deleted : "+message);
     * });
     */
    if (!oldMessage.deleted && newMessage.deleted) {
        client.emit('messageDeleted', oldMessage);
    }
}
