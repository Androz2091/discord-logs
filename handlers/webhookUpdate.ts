import { Client, Webhook } from 'discord.js';

export async function handleWebhookUpdateEvent(client: Client, oldWebhook: Webhook, newWebhook: Webhook) {
    // If there is a new webhook
    if (!oldWebhook.id && newWebhook.id) {
        client.emit('WebhookAdd', newWebhook)
    }
    // If a webhook was delete
    if (oldWebhook.id && !newWebhook.id) {
        client.emit('WebhookRemove',oldWebhook)
    }
 }
