import { Client,PermissionsOverwrites} from 'discord.js';

/**
 * @handler Permission Events
 * @related permissionUpdate
 */
export async function handlePermissionUpdateEvent(client: Client, oldPerms: PermissionsOverwrites, newPerms: PermissionsOverwrites) {
    let emitted = false;
    /**
     * @event permissionUpdate
     * @description Emitted when a  has been deleted.
     * @param {DJS:Emoji} emoji The emoji who has been deleted.
     * @param {string} oldEmoji The old emoji.
     * @param {string} newEmoji The new emoji.
     * @example
     * client.on("emojiD", (emoji) => {
     *   console.log(emoji+" has been deleted");
     * });
     */
    if (oldPerms.allow !== newPerms.allow) {
        client.emit("permissionsUpdate",newPerms.allow)
        emitted = true;
    }
  }
