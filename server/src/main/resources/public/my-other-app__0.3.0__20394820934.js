(function() {
    const appId = 'my-other-app';
    const version = '0.3.0';

    const createApp = () => {
        const content = document.createElement('div');
        content.append(`hello, I'm ${appId} version ${version}`);
        return content;
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
            container.append(createApp());
        },
        destroy: () => {}
    };
})()
