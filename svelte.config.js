import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess({ script: true }),

	kit: {
		// https://kit.svelte.dev/docs/single-page-apps#prerendering-individual-pages
		adapter: adapter({
			fallback: 'index.html'
		})
		//paths: {base: '/join-dormspam'},
	}
};

export default config;
