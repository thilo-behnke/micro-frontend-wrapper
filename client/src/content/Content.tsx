import React, {useContext, useEffect, useState} from "react";
import {AppManifest, ManifestProviderContext} from "../manifest/ManifestProvider";
import './Content.scss';
import {usePrevious} from "../utils/PreviousHook";

function Content(props: ContentProps) {
    const manifestProvider = useContext(ManifestProviderContext)
    const [activeApp, setActiveApp] = useState<null | AppManifest>(null);
    const prevApp = usePrevious(activeApp);

    useEffect(() => {
        const subscription = manifestProvider.getActive$()
            .subscribe(newActiveApp => {
                setActiveApp(newActiveApp);
            });
        return () => subscription.unsubscribe();
    }, [])

    useEffect(() => {
        const contentBox = document.getElementById('content-box');
        if(prevApp) {
            contentBox!.innerHTML = '';
            (window as any).MICRO_FRONTEND_WRAPPER[prevApp.appId][prevApp.version].destroy();
        }
        if (activeApp) {
            (window as any).MICRO_FRONTEND_WRAPPER[activeApp.appId][activeApp.version].init(contentBox);
        }
    }, [activeApp])

    return <div className="content-wrapper">
        {
            activeApp
                ? <div className={props.className}>
                    {activeApp?.appName} is active!
                </div>
                : <div>No app is active</div>
        }
        <div id="content-box">
        </div>
    </div>;
}

export type ContentProps = {
    className?: string
}

export default Content;
