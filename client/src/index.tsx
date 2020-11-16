import React from "react";
import ReactDOM from "react-dom";
import Wrapper from "./Wrapper";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {DefaultAppRegistry, AppRegistry} from "./manifest/AppRegistry";
import {
    AppManifestHandler,
    AppManifestHandlerContext,
    DefaultAppManifestHandler,
} from "./manifest/AppManifestHandler";
import {
    DefaultWindowProvider,
    WindowProvider,
} from "./browser/WindowProvider";
import {
    DefaultServiceRegistryHandler,
    ServiceRegistryHandler,
} from "./serviceRegistry/ServiceRegistryHandler";
import {DefaultEventHandler} from "./events/EventHandler";

const manifestRegistry: AppRegistry = new DefaultAppRegistry();
const windowProvider: WindowProvider = new DefaultWindowProvider(
    manifestRegistry
);
windowProvider.init();

const serviceRegistryHandler: ServiceRegistryHandler = new DefaultServiceRegistryHandler();
const eventHandler = new DefaultEventHandler();
const appManifestHandler: AppManifestHandler = new DefaultAppManifestHandler(
    manifestRegistry,
    serviceRegistryHandler,
    eventHandler
);

ReactDOM.render(
    <React.StrictMode>
        <AppManifestHandlerContext.Provider value={appManifestHandler}>
            <Wrapper/>
        </AppManifestHandlerContext.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
