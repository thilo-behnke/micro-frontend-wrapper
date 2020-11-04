import React from "react";
import {BehaviorSubject, combineLatest, from, Observable, of} from "rxjs";
import {map, mergeMap, shareReplay, switchMap, tap} from "rxjs/operators";
import {fromFetch} from "rxjs/fetch";

export type AppManifest = {
    appId: string;
    appName: string;
    version: string;
    url: string;
}

export interface ManifestProvider {
    loadApps: () => Observable<AppManifest[]>;
    getActive$: () => Observable<null | AppManifest>;
    setActive: (appId: string) => void;
}

export class DefaultManifestProvider implements ManifestProvider {
    private active$ = new BehaviorSubject<null | AppManifest>(null);
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

    setActive = (appId: string) => {
        const manifest = this.manifests.find(({appId: id}) => appId === id);
        if (manifest) {
            this.active$.next(manifest);
        } else {
            console.warn(`Unable to activate app with id ${appId}. Manifest was not loaded`);
        }
    }

    getActive$ = () => {
        return this.active$.asObservable();
    }
}

export class NoopManifestProvider implements ManifestProvider {
    loadApps = () => {
        return of([]);
    }

    getActive$ = () => {
        return of(null);
    }

    setActive(appId: string): void {
        return;
    }
}

const noopManifestProvider = new NoopManifestProvider();

export const ManifestProviderContext = React.createContext<ManifestProvider>(noopManifestProvider);
