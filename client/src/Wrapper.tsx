import React, { useContext, useEffect, useState } from "react";
import "./Wrapper.scss";
import Content from "./content/Content";
import Header from "./header/Header";
import { usePrevious } from "./utils/PreviousHook";
import { AppManifest } from "./manifest/AppManifest";
import { AppManifestHandlerContext } from "./manifest/AppManifestHandler";

function Wrapper() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [activeApp, setActiveApp] = useState<AppManifest | null>(null);
  const [availableApps, setAvailableApps] = useState<AppManifest[]>([]);

  const appManifestHandler = useContext(AppManifestHandlerContext);

  const prevActiveApp = usePrevious<AppManifest | null>(
    activeApp
  ) as AppManifest | null;

  useEffect(() => {
    setLoading(true);
    const subscription = appManifestHandler
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
  }, [appManifestHandler]);

  const activateApp = async (
    container: HTMLElement,
    appManifest: AppManifest | null
  ) => {
    await appManifestHandler.switchApps(container, prevActiveApp, appManifest);
  };

  return (
    <div className="app">
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
    </div>
  );
}

export default Wrapper;
