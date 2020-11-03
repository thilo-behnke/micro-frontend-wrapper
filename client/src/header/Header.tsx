import React from "react";
import {Manifest} from "../manifest/ManifestProvider";

function Header(props: HeaderProps) {
    return <div className={props.className}> {props.availableApps.map(app => <button onClick={() => props.setActiveApp(app.appId)}
        key={app.appId}>{app.appName}</button>)} </div>
}

export type HeaderProps = {
    availableApps: Manifest[];
    setActiveApp: (appId: string) => void;
    className?: string;
}

export default Header;
