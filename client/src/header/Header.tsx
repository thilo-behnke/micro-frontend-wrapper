import React from "react";
import {AppManifest} from "../manifest/ManifestProvider";
import {Button} from "react-bootstrap";
import classNames from "classnames";
import './Header.scss';

function Header(props: HeaderProps) {
    return <div className={classNames(props.className, 'header-content')}> {props.availableApps.map(app => <Button onClick={() => props.setActiveApp(app)}
        key={app.appId}>{app.appName}</Button>)} </div>
}

export type HeaderProps = {
    activeApp: AppManifest | null;
    availableApps: AppManifest[];
    setActiveApp: (app: AppManifest) => void;
    className?: string;
}

export default Header;
