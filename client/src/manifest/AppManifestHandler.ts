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
import { AppManifest, ServiceManifest } from "./AppManifest";
import { AppRegistry } from "./AppRegistry";
import {Service, ServiceRegistryHandler} from "../serviceRegistry/ServiceRegistryHandler";
import {EventHandler} from "../events/EventHandler";

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
    private serviceRegistryHandler: ServiceRegistryHandler,
    private eventHandler: EventHandler
  ) {}

  loadApps = () => {
    return fromFetch("/manifest-api/manifests").pipe(
      switchMap((res) => res.json()),
      tap((apps: AppManifest[]) => {
        // TODO: Handle deregistration case.
        apps.forEach(({ appUrl }) => {
          const script = document.createElement("script");
          script.src = appUrl;
          script.async = true;
          document.body.append(script);
        });
      }),
      mergeMap((apps: AppManifest[]) => {
        const appsWithBackends = apps.map(
          ({ services, ...rest }): Observable<AppManifest> => {
            // TODO: Ideally this should not be done right away, but when the apps are loaded. This is not important until the app is actually used.
            const backendsWithUrl = !services.length
              ? of([])
              : services.map(
                  (backend: ServiceManifest): Observable<ServiceManifest> =>
                    // TODO: Handle errors.
                    this.serviceRegistryHandler
                      .getService(backend.serviceId, backend.serviceVersion)
                      .pipe(
                        map((service: Service) => ({
                          ...backend,
                          serviceName: service.serviceName,
                          serviceUrl: service.serviceUrl,
                        }))
                      )
                );
            return forkJoin(backendsWithUrl).pipe(
              map(
                (newBackends: ServiceManifest[]): AppManifest => ({
                  services: newBackends,
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
        prevApp.appVersion
      );
      if (!prevAppReg) {
        console.warn(
          `Could not properly destroy app ${prevApp.appId} version ${prevApp.appVersion}. This could e.g. cause memory leaks!`
        );
        return;
      }
      await prevAppReg!.destroy();
    }
    if (newApp) {
      const newAppReg = this.appRegistry.getApp(newApp.appId, newApp.appVersion);
      if (!newAppReg) {
        console.error(
          `Could not initialize app ${newApp.appId} version ${newApp.appVersion}.`
        );
        return;
      }
      await newAppReg!.init({
        container: contentBox!,
        services: newApp.services,
        eventHandler: this.eventHandler
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
