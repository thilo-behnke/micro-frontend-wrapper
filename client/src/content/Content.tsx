import React, {useEffect} from "react";
import {AppManifest} from "../manifest/ManifestProvider";
import './Content.scss';
import {Alert} from "react-bootstrap";
import classNames from "classnames";

function Content(props: ContentProps) {
    useEffect(() => {
        const contentBox = document.getElementById('content-box')!;
        props.activateApp(contentBox, props.activeApp);
    });

    return <div className="content-wrapper">
        {
            props.activeApp
                ? <Alert variant="success" className={classNames('d-flex', 'justify-content-center', props.className)}>
                    {props.activeApp?.appName} is active!
                </Alert>
                : <Alert variant="danger" className={classNames('d-flex', 'justify-content-center', props.className)}>No
                    app is active</Alert>
        }
        <div id="content-box" className={classNames('d-flex', 'justify-content-center')}>
        </div>
    </div>;
}

export type ContentProps = {
    className?: string
    activeApp: AppManifest | null
    activateApp: (container: HTMLElement, appManifest: AppManifest | null) => void;
}

export default Content;
