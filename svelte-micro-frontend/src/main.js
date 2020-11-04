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

	if(!window.MICRO_FRONTEND_WRAPPER) {
		console.error(`Missing window property MICRO_FRONTEND_WRAPPER, cannot register app ${appId} version ${version}.`);
		return;
	}

	if(!window.MICRO_FRONTEND_WRAPPER[appId]) {
		window.MICRO_FRONTEND_WRAPPER[appId] = {};
	}
	window.MICRO_FRONTEND_WRAPPER[appId][version] = {
		init: container => {
		    createApp(container);
		},
		destroy: () => {}
	};
})();

