import React from "react";
import {AppManifest} from "../manifest/ManifestProvider";

function Header(props: HeaderProps) {
    return <div className={props.className}> {props.availableApps.map(app => <button onClick={() => props.setActiveApp(app)}
        key={app.appId}>{app.appName}</button>)} </div>
}

export type HeaderProps = {
    activeApp: AppManifest | null;
    availableApps: AppManifest[];
    setActiveApp: (app: AppManifest) => void;
    className?: string;
}

export default Header;
