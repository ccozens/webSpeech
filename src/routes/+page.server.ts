// from https://github.com/vercel/examples/blob/main/storage/kv-redis-sveltekit/src/routes/%2Bpage.server.ts

import { createClient } from '@vercel/kv';
import { dev } from '$app/environment';

import { KV_REST_API_URL, KV_REST_API_TOKEN } from '$env/static/private';
/** @type {import('./$types').PageLoad} */
export async function load() {
	// do not access KV in dev mode so page visit counter not incremented
	if (dev) {
		return {
			pageVisits: 42
		};
	} else {
		// create a new client
		const client = createClient({
			url: KV_REST_API_URL,
			token: KV_REST_API_TOKEN
		});

		const pageVisits = await client.get<number>('pageVisits');
		await client.set('pageVisits', (pageVisits || 0) + 1);
		const updatedPageVisits = await client.get('pageVisits');

		return {
			pageVisits: updatedPageVisits
		};
	}
}
