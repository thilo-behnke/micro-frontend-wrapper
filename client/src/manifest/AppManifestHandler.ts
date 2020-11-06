import { Context, createContext } from "react";
import { Observable, of } from "rxjs";
import { shareReplay, switchMap } from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import { AppManifest } from "./AppManifest";
import { AppRegistry } from "./AppRegistry";

export interface AppManifestHandler {
  loadApps: () => Observable<AppManifest[]>;
  switchApps: (
    container: Element,
    prevApp: AppManifest | null,
    newApp: AppManifest | null
  ) => Promise<void>;
}

export class DefaultAppManifestHandler implements AppManifestHandler {
  constructor(private appRegistry: AppRegistry) {}

  loadApps = () => {
    return fromFetch("/api/manifests").pipe(
      switchMap((res) => res.json()),
      shareReplay(1)
    );
  };

  async switchApps(
    container: Element,
    prevApp: AppManifest | null,
    newApp: AppManifest | null
  ) {
    const contentBox = document.getElementById("content-box");
    if (prevApp) {
      contentBox!.innerHTML = "";
      const prevAppReg = this.appRegistry.getApp(
        prevApp.appId,
        prevApp.version
      );
      if (!prevAppReg) {
        console.warn(
          `Could not properly destroy app ${prevApp.appId} version ${prevApp.version}. This could e.g. cause memory leaks!`
        );
        return;
      }
      await prevAppReg!.destroy();
    }
    if (newApp) {
      const newAppReg = this.appRegistry.getApp(newApp.appId, newApp.version);
      if (!newAppReg) {
        console.error(
          `Could not initialize app ${newApp.appId} version ${newApp.version}.`
        );
        return;
      }
      await newAppReg!.init({
        container: contentBox!,
        backends: newApp.backends,
      });
    }
  }
}

export class NoopManifestHandler implements AppManifestHandler {
  loadApps = () => {
    return of([]);
  };

  switchApps(
    container: Element,
    prevApp: AppManifest | null,
    newApp: AppManifest | null
  ): Promise<void> {
    return Promise.resolve();
  }
}

const noopManifestHandler = new NoopManifestHandler();

export const AppManifestHandlerContext: Context<AppManifestHandler> = createContext(
  noopManifestHandler as AppManifestHandler
);
