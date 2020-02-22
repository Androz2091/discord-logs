import { Client, Role } from 'discord.js';

/**
 * @handler Role Events
role */
export async function handleRoleUpdateEvent(client: Client, oldRole: Role, newRole: Role) {
    /**
     * @event rolePositionUpdate
     * @description Emitted when a role position changes.
     * @param {DJS:Role} role The role whose position has changed.
     * @param {number} oldPosition The old role position.
     * @param {number} newPosition The new role position.
     * @example
     * client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
     *   console.log(role.name + " was at position "+oldPosition+" and now is at position "+newPosition);
     * });
     */
    if (oldRole.rawPosition !== newRole.rawPosition) {
        client.emit('rolePositionUpdate', newRole, oldRole.rawPosition, newRole.rawPosition);
    }
}
