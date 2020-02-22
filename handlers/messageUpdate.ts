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
     * @event messageEdited
     * @description Emitted when a message has been edited.
     * @param {DJS:Message} oldMessage The message before it was edited.
     * @param {object} oldMessage The message before that was edited.
     * @param {object} newMessage The message after that was edited.
     * @example
     * client.on("messageEdited", (message,oldMessage,newMessage) => {
     *   console.log("This message has been edited to "+newMessage);
     * });
     */
    if (!oldMessage.edits && newMessage.edits) {
        client.emit('messagePinned', newMessage,newMessage.edits[0],newMessage.edits[1]);
    }
}
