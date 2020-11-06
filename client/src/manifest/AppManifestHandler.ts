import { Context, createContext } from "react";
import { forkJoin, Observable, of } from "rxjs";
import {
  concatAll,
  map,
  mergeAll,
  mergeMap,
  reduce,
  shareReplay,
  switchMap,
  tap,
} from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import { AppManifest, Backend } from "./AppManifest";
import { AppRegistry } from "./AppRegistry";
import { ServiceRegistryHandler } from "../serviceRegistry/ServiceRegistryHandler";

export interface AppManifestHandler {
  loadApps: () => Observable<AppManifest[]>;
  switchApps: (
    container: Element,
    prevApp: AppManifest | null,
    newApp: AppManifest | null
  ) => Promise<void>;
}

export class DefaultAppManifestHandler implements AppManifestHandler {
  constructor(
    private appRegistry: AppRegistry,
    private serviceRegistryHandler: ServiceRegistryHandler
  ) {}

  loadApps = () => {
    return fromFetch("/manifest-api/manifests").pipe(
      switchMap((res) => res.json()),
      tap((apps: AppManifest[]) => {
        // TODO: Handle deregistration case.
        apps.forEach(({ url }) => {
          const script = document.createElement("script");
          script.src = url;
          script.async = true;
          document.body.append(script);
        });
      }),
      mergeMap((apps: AppManifest[]) => {
        const appsWithBackends = apps.map(
          ({ backends, ...rest }): Observable<AppManifest> => {
            // TODO: Ideally this should not be done right away, but when the apps are loaded. This is not important until the app is actually used.
            const backendsWithUrl = !backends.length
              ? of([])
              : backends.map(
                  (backend: Backend): Observable<Backend> =>
                    // TODO: Handle errors.
                    this.serviceRegistryHandler
                      .getService(backend.id, backend.version)
                      .pipe(
                        map((service) => ({
                          ...backend,
                          serviceUrl: service.url,
                        }))
                      )
                );
            return forkJoin(backendsWithUrl).pipe(
              map(
                (newBackends: Backend[]): AppManifest => ({
                  backends: newBackends,
                  ...rest,
                })
              )
            );
          }
        );
        return forkJoin(appsWithBackends);
      }),
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
