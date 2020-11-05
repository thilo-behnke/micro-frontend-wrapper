import { areAppDefinitionsEqual } from "./ManifestUtils";

export interface AppRegistry {
  register(appDef: MicroFrontendAppDefinition): void;
  deregister(appManifest: MicroFrontendAppDefinition): void;
  getApp(appId: string, version: string): MicroFrontendAppDefinition | null;
}

export type InitFunc = (elem: HTMLElement) => Promise<void>;
export type DestroyFunc = () => Promise<void>;

export type MicroFrontendAppDefinition = {
  appId: string;
  version: string;
  init: InitFunc;
  destroy: DestroyFunc;
};

export class DefaultAppRegistry implements AppRegistry {
  private microFrontendApps: MicroFrontendAppDefinition[] = [];

  register(appDef: MicroFrontendAppDefinition): void {
    this.microFrontendApps = [...this.microFrontendApps, appDef];
  }

  deregister(microFrontendApp: MicroFrontendAppDefinition) {
    this.microFrontendApps = this.microFrontendApps.filter(
      areAppDefinitionsEqual(microFrontendApp)
    );
  }

  getApp(id: string, v: string): MicroFrontendAppDefinition | null {
    return (
      this.microFrontendApps.find(
        ({ appId, version }) => id === appId && v === version
      ) || null
    );
  }
}
