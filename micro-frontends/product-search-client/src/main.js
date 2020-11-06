import App from './App.svelte';

(() => {
	const appId = 'product-search-app';
	const version = '1.0.0';

	const createApp = ({container, backends}) => {
		new App({
			target: container,
			props: {
				backends
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
		init: (args) => {
			createApp(args);
			return Promise.resolve();
		},
		destroy: () => {
			return Promise.resolve();
		}
	})
})();

