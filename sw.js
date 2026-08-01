// Novo Messenger - Service Worker
// Only responsible for displaying local notifications (triggered by the app
// itself via registration.showNotification) and routing notification clicks
// back into an open app tab. This does NOT implement server-triggered Web
// Push - true "app fully closed" push requires a backend (e.g. Firebase
// Cloud Messaging + a Cloud Function that fires on new message writes).

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
    const data = event.notification.data || {};
    event.notification.close();

    event.waitUntil((async () => {
        const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
        for (const client of allClients) {
            if ('focus' in client) {
                await client.focus();
                client.postMessage({ type: 'open-chat', chatId: data.chatId, otherUid: data.otherUid, otherUsername: data.otherUsername });
                return;
            }
        }
        if (self.clients.openWindow) {
            await self.clients.openWindow('./');
        }
    })());
});
