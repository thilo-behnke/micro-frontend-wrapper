const appId = 'my-other-app';
const version = '0.3.0';

const createApp = () => {
    return `<div>hello, I'm ${appId} version ${version}</div>`;
}

if(!window.MICRO_FRONTEND_WRAPPER) {
    console.error(`Missing window property MICRO_FRONTEND_WRAPPER, cannot register app ${appId} version ${version}.`);
}

if(!window.MICRO_FRONTEND_WRAPPER['my-app']) {
    window.MICRO_FRONTEND_WRAPPER['my-app'] = {};
}
window.MICRO_FRONTEND_WRAPPER[appId][version] = {
    init: container => {
        document.getElementById(container).append(createApp());
    },
    destroy: () => {}
};
