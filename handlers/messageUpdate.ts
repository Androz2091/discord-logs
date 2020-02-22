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
     * @event messageContentEdited
     * @description Emitted when a message content has been edited.
     * @param {DJS:Message} message The old message.
     * @param {string} oldContent The message content before it was edited.
     * @param {string} newContent The message content after it was edited.
     * @example
     * client.on("messageContentEdited", (message, oldContent, newContent) => {
     *   console.log("Message with ID "+message.id+" has been edited to "+newContent);
     * });
     */
    if (oldMessage.content !== newMessage.content) {
        client.emit('messageContentEdited', newMessage, oldMessage.content, newMessage.content);
    }
}
