import React, {useEffect} from "react";
import {AppManifest} from "../manifest/ManifestProvider";
import './Content.scss';

function Content(props: ContentProps) {
    useEffect(() => {
        const contentBox = document.getElementById('content-box')!;
        props.activateApp(contentBox, props.activeApp);
    });

    return <div className="content-wrapper">
        {
            props.activeApp
                ? <div className={props.className}>
                    {props.activeApp?.appName} is active!
                </div>
                : <div>No app is active</div>
        }
        <div id="content-box">
        </div>
    </div>;
}

export type ContentProps = {
    className?: string
    activeApp: AppManifest | null
    activateApp: (container: HTMLElement, appManifest: AppManifest | null) => void;
}

export default Content;
