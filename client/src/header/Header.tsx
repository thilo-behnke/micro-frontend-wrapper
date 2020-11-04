import React from "react";
import {AppManifest} from "../manifest/ManifestProvider";

function Header(props: HeaderProps) {
    return <div className={props.className}> {props.availableApps.map(app => <button onClick={() => props.setActiveApp(app.appId)}
        key={app.appId}>{app.appName}</button>)} </div>
}

export type HeaderProps = {
    availableApps: AppManifest[];
    setActiveApp: (appId: string) => void;
    className?: string;
}

export default Header;
