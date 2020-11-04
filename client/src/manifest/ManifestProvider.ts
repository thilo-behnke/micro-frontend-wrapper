import React from "react";
import {BehaviorSubject, Observable, of} from "rxjs";
import {shareReplay, tap} from "rxjs/operators";

export type Manifest = {
    appId: string;
    appName: string;
    url: string;
}

export type InitArgs = {
    containerId: string;
}

export type DestroyArgs = {
}

export interface ManifestProvider {
    loadApps: () => Observable<Manifest[]>;
    getActive$: () => Observable<null | Manifest>;
    setActive: (appId: string) => void;
}

export class DefaultManifestProvider implements ManifestProvider {
    private active$ = new BehaviorSubject<null | Manifest>(null);
    private manifests: Manifest[] = [];

    loadApps = () => {
        return of([
            {
                appId: 'my-app',
                appName: 'MyApp'
            },
            {
                appId: 'my-other-app',
                appName: 'MyOtherApp'
            }
        ]).pipe(
            tap(console.log),
            tap(manifests => this.manifests = manifests),
            shareReplay(1)
        );
    }

    setActive = (appId: string) => {
       const manifest = this.manifests.find(({appId: id}) => appId === id);
       if(manifest) {
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
