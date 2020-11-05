import App from './App.svelte';

(() => {
	const appId = 'svelte-app';
	const version = '2.0.1';

	const createApp = (container) => {
		new App({
			target: container,
			props: {
				name: 'world'
			}
		});
	}

	if(!window.MICRO_FRONTEND_WRAPPER || !window.MICRO_FRONTEND_WRAPPER.MANIFEST_REGISTRY) {
		console.error(`Missing window property in MICRO_FRONTEND_WRAPPER, cannot register app ${appId} version ${version}.`);
		return;
	}

	window.MICRO_FRONTEND_WRAPPER.MANIFEST_REGISTRY.register({
		appId,
		version,
		init: container => {
			createApp(container);
			return Promise.resolve();
		},
		destroy: () => {
			return Promise.resolve();
		}
	})
})();

