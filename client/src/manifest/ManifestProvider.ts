import React from "react";
import {Observable, of} from "rxjs";
import {shareReplay, switchMap, tap} from "rxjs/operators";
import {fromFetch} from "rxjs/fetch";

export type AppManifest = {
    appId: string;
    appName: string;
    version: string;
    url: string;
}

export interface ManifestProvider {
    loadApps: () => Observable<AppManifest[]>;
    switchApps: (container: Element, prevApp: AppManifest | null, newApp: AppManifest | null) => void;
}

export class DefaultManifestProvider implements ManifestProvider {
    private manifests: AppManifest[] = [];

    loadApps = () => {
        return fromFetch('/api/manifests').pipe(
            switchMap(res => res.json()),
            tap((manifests: AppManifest[]) => {
                this.manifests = manifests;
            }),
            shareReplay(1)
        );
    }

    switchApps(container: Element, prevApp: AppManifest | null, newApp: AppManifest | null) {
        const MICRO_FRONTEND_WRAPPER = (window as any).MICRO_FRONTEND_WRAPPER;
        const contentBox = document.getElementById('content-box');
        if(prevApp) {
            contentBox!.innerHTML = '';
            const prevAppReg = MICRO_FRONTEND_WRAPPER[prevApp.appId] && MICRO_FRONTEND_WRAPPER[prevApp.appId][prevApp.version];
            if(!prevAppReg) {
                console.warn(`Could not properly destroy app ${prevApp.appId} version ${prevApp.version}. This could e.g. cause memory leaks!`)
            }
            (window as any).MICRO_FRONTEND_WRAPPER[prevApp.appId][prevApp.version].destroy();
        }
        if(newApp) {
            const newAppReg = MICRO_FRONTEND_WRAPPER[newApp.appId] && MICRO_FRONTEND_WRAPPER[newApp.appId][newApp.version];
            if(!newAppReg) {
                console.error(`Could not initialize app ${newApp.appId} version ${newApp.version}.`)
            }
            (window as any).MICRO_FRONTEND_WRAPPER[newApp.appId][newApp.version].init(contentBox);
        }
    }
}

export class NoopManifestProvider implements ManifestProvider {
    loadApps = () => {
        return of([]);
    }

    switchApps(container: Element, prevApp: AppManifest | null, newApp: AppManifest | null): void {
    }
}

const noopManifestProvider = new NoopManifestProvider();

export const ManifestProviderContext = React.createContext<ManifestProvider>(noopManifestProvider);
