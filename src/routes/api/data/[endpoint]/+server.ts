import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { dataStore } from '$lib/dataStore.js';

export const GET: RequestHandler = async ({ params }) => {
    try {
        const endpoint = params.endpoint;
        
        if (!endpoint || !dataStore.has(endpoint)) {
            return json({ error: 'Endpoint not found' }, { status: 404 });
        }
        
        const data = dataStore.get(endpoint);
        return json(data);
    } catch (error) {
        return json({ error: 'Failed to read data' }, { status: 500 });
    }
};

export const DELETE: RequestHandler = async ({ params }) => {
    try {
        const endpoint = params.endpoint;
        
        if (!endpoint || !dataStore.has(endpoint)) {
            return json({ error: 'Endpoint not found' }, { status: 404 });
        }
        
        dataStore.delete(endpoint);
        return json({ success: true, message: 'Endpoint deleted' });
    } catch (error) {
        return json({ error: 'Failed to delete endpoint' }, { status: 500 });
    }
};