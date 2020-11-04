import React, { useEffect, useState } from "react";
import "./Wrapper.scss";
import {
  AppManifest,
  DefaultManifestProvider,
  ManifestProvider,
  ManifestProviderContext,
} from "./manifest/ManifestProvider";
import Content from "./content/Content";
import Header from "./header/Header";
import { usePrevious } from "./utils/PreviousHook";

// TODO: There needs to be a wrapper around App that provides this value.
const manifestProvider: ManifestProvider = new DefaultManifestProvider();

function Wrapper() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [activeApp, setActiveApp] = useState<AppManifest | null>(null);
  const [availableApps, setAvailableApps] = useState<AppManifest[]>([]);

  const prevActiveApp = usePrevious<AppManifest | null>(
    activeApp
  ) as AppManifest | null;

  useEffect(() => {
    setLoading(true);
    const subscription = manifestProvider
      .loadApps()
      .subscribe((apps: AppManifest[]) => {
        setAvailableApps(apps);
        apps.forEach(({ url }) => {
          const script = document.createElement("script");
          script.src = url;
          script.async = true;
          document.body.append(script);
        });
        setLoading(false);
      });
    return () => subscription.unsubscribe();
  }, []);

  const activateApp = (
    container: HTMLElement,
    appManifest: AppManifest | null
  ) => {
    manifestProvider.switchApps(container, prevActiveApp, appManifest);
  };

  return (
    <div className="app">
      <ManifestProviderContext.Provider value={manifestProvider}>
        <Header
          className="app__header"
          isLoading={isLoading}
          availableApps={availableApps}
          activeApp={activeApp}
          setActiveApp={setActiveApp}
        />
        <Content
          activeApp={activeApp}
          activateApp={activateApp}
          className="app__content"
        />
        <div className="app__footer">footer</div>
      </ManifestProviderContext.Provider>
    </div>
  );
}

export default Wrapper;
