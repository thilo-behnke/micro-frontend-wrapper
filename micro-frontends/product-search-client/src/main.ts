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

	if((window as any).MICRO_FRONTEND_WRAPPER && (window as any).MICRO_FRONTEND_WRAPPER.MANIFEST_REGISTRY) {
		(window as any).MICRO_FRONTEND_WRAPPER.MANIFEST_REGISTRY.register({
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
	} else {
		console.warn(`Missing window property in MICRO_FRONTEND_WRAPPER, cannot register app ${appId} version ${version}.`);
		// Local dev mode.
		const container = document.createElement('div');
		container.style.display = 'flex';
		container.style.width = '60%';
		container.style.justifyContent = 'center';
		container.style.marginLeft = 'auto';
		container.style.marginRight = 'auto';
		document.body.append(container);
		createApp({container, backends: []});
	}
})();

