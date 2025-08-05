import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { dataStore } from '$lib/dataStore.js';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { endpoint, data } = await request.json();
        
        if (!endpoint || !data) {
            return json({ error: 'Missing endpoint or data' }, { status: 400 });
        }

        // Sanitize endpoint name
        const sanitizedEndpoint = endpoint.replace(/[^a-zA-Z0-9-_]/g, '');
        
        // Save data to memory
        dataStore.set(sanitizedEndpoint, data);
        
        return json({ success: true, endpoint: sanitizedEndpoint });
    } catch (error) {
        return json({ error: 'Failed to save data' }, { status: 500 });
    }
};

export const GET: RequestHandler = async () => {
    try {
        const endpoints = Array.from(dataStore.keys());
        return json({ endpoints, total: endpoints.length });
    } catch (error) {
        return json({ error: 'Failed to list endpoints' }, { status: 500 });
    }
};