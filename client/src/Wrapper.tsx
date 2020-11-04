import React, {useEffect, useState} from "react";
import "./Wrapper.scss";
import {
    DefaultManifestProvider,
    AppManifest,
    ManifestProvider,
    ManifestProviderContext
} from "./manifest/ManifestProvider";
import Content from "./content/Content";
import Header from "./header/Header";

// TODO: There needs to be a wrapper around App that provides this value.
const manifestProvider: ManifestProvider = new DefaultManifestProvider();

function Wrapper() {
    const [availableApps, setAvailableApps] = useState<AppManifest[]>([]);

    useEffect(() => {
        const subscription = manifestProvider.loadApps()
            .subscribe((apps: AppManifest[]) => {
                setAvailableApps(apps);
                apps.forEach(({url}) => {
                    const script = document.createElement('script');
                    script.src = url
                    script.async = true
                    document.body.append(script);
                })
            });
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

export default Wrapper;
