(function() {
    const appId = 'simple-js-app';
    const version = '1.0.1';

    const createApp = () => {
        const content = document.createElement('div');
        content.append(`hello, I'm ${appId} version ${version}`);
        return content;
    }

    if(!window.MICRO_FRONTEND_WRAPPER || !window.MICRO_FRONTEND_WRAPPER.MANIFEST_REGISTRY) {
        console.error(`Missing window property in MICRO_FRONTEND_WRAPPER, cannot register app ${appId} version ${version}.`);
        return;
    }

    window.MICRO_FRONTEND_WRAPPER.MANIFEST_REGISTRY.register({
        appId,
        version,
        init: ({container}) => {
            container.append(createApp());
            return Promise.resolve();
        },
        destroy: () => {
            return Promise.resolve();
        }
    })
})();
