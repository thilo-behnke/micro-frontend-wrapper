import React, {useEffect, useState} from "react";
import "./App.scss";
import {
    DefaultManifestProvider,
    Manifest,
    ManifestProvider,
    ManifestProviderContext
} from "./manifest/ManifestProvider";
import Content from "./content/Content";
import Header from "./header/Header";

// TODO: There needs to be a wrapper around App that provides this value.
const manifestProvider: ManifestProvider = new DefaultManifestProvider();

function App() {
    const [availableApps, setAvailableApps] = useState<Manifest[]>([]);

    useEffect(() => {
        const subscription = manifestProvider.loadApps()
            .subscribe((apps: Manifest[]) => setAvailableApps(apps));
        return () => subscription.unsubscribe();
    }, [])

    return (
    <div className="app">
        <ManifestProviderContext.Provider value={manifestProvider}>
            <Header className="app__header" availableApps={availableApps} setActiveApp={manifestProvider.setActive}/>
            <Content className="app__content"/>
            <div className="app__footer">footer</div>
        </ManifestProviderContext.Provider>
    </div>
  );
}

export default App;
