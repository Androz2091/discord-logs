import { Client, Message, PartialMessage } from 'discord.js';

/**
 * @handler Message Events
 * @related messageUpdate
 */
export async function handleMessageUpdateEvent(
    client: Client,
    oldMessage: Message | PartialMessage,
    newMessage: Message | PartialMessage,
) {
    let emitted = false;
    if (!oldMessage.partial && !newMessage.partial) {
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
            emitted = true;
        }
        /**
         * @event messageContentEdited
         * @description Emitted when a message content has been edited.
         * @param {DJS:Message} message The old message.
         * @param {string} oldContent The message content before it was edited.
         * @param {string} newContent The message content after it was edited.
         * @example
         * client.on("messageContentEdited", (message, oldContent, newContent) => {
         *   console.log("Message '"+message.id+"' has been edited to "+newContent);
         * });
         */
        if (oldMessage.content !== newMessage.content) {
            client.emit('messageContentEdited', newMessage, oldMessage.content, newMessage.content);
            emitted = true;
        }
    }

    /**
     * @event unhandledMessageUpdate
     * @description Emitted when the messageUpdate event is triggered but discord-logs didn't trigger any custom event.
     * @param {DJS:Message} oldMessage The message before the update.
     * @param {DJS:Message} newMessage The message after the update.
     * @example
     * client.on("unhandledMessageUpdate", (oldMessage, newMessage) => {
     *   console.log("Message '"+oldMessage.id+"' was edited but discord-logs couldn't find what was updated...");
     * });
     */
    if (!emitted) {
        client.emit('unhandledMessageUpdate', oldMessage, newMessage);
    }
}
