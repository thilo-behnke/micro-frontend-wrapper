import { AppRegistry } from "../manifest/AppRegistry";

export type Window = typeof window & {
  MICRO_FRONTEND_WRAPPER: {
    MANIFEST_REGISTRY: AppRegistry;
  };
};

export abstract class WindowProvider {
  abstract init(): void;
  abstract get window(): Window;
}

export class DefaultWindowProvider implements WindowProvider {
  constructor(private manifestRegistry: AppRegistry) {}

  init() {
    if (!this.window.MICRO_FRONTEND_WRAPPER) {
      this.window.MICRO_FRONTEND_WRAPPER = {
        MANIFEST_REGISTRY: this.manifestRegistry,
      };
    }
  }

  get window(): Window {
    return window as Window;
  }
}
