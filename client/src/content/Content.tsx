import React, {useContext, useEffect, useState} from "react";
import {Manifest, ManifestProviderContext} from "../manifest/ManifestProvider";

function Content(props: ContentProps) {
    const manifestProvider = useContext(ManifestProviderContext)
    const [activeApp, setActiveApp] = useState<null | Manifest>(null);

    useEffect(() => {
        const subscription = manifestProvider.getActive$()
            .subscribe(activeApp => {
                setActiveApp(activeApp);
            });
        return () => subscription.unsubscribe();
    }, [])

    return activeApp ? <div className={props.className}>{activeApp?.appName} is active!</div> : <div>No app is active</div>;
}

export type ContentProps = {
    className?: string
}

export default Content;
