import React from "react";
import { AppManifest } from "../manifest/ManifestProvider";
import { Button, Spinner } from "react-bootstrap";
import classNames from "classnames";
import "./Header.scss";

function Header(props: HeaderProps) {
  return (
    <div className={classNames(props.className, "header-content")}>
      {props.isLoading ? (
        <Spinner animation="border" />
      ) : (
        props.availableApps.map((app) => (
          <Button
            variant={
              app.appId === props.activeApp?.appId &&
              app.version === props.activeApp?.version
                ? "primary"
                : "secondary"
            }
            onClick={() => props.setActiveApp(app)}
            key={app.appId}
          >
            {app.appName}
          </Button>
        ))
      )}
    </div>
  );
}

export type HeaderProps = {
  isLoading: boolean;
  activeApp: AppManifest | null;
  availableApps: AppManifest[];
  setActiveApp: (app: AppManifest) => void;
  className?: string;
};

export default Header;
