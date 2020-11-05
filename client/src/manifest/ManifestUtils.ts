import { curry } from "lodash";
import { AppManifest } from "./AppManifest";
import { MicroFrontendAppDefinition } from "./AppRegistry";

export const areManifestsEqual = curry(
  (manifestA: AppManifest, manifestB: AppManifest) => {
    return (
      manifestA.appId === manifestB.appId &&
      manifestA.version === manifestB.version
    );
  }
);

export const areAppDefinitionsEqual = curry(
  (
    microFrontendAppA: MicroFrontendAppDefinition,
    microFrontendAppB: MicroFrontendAppDefinition
  ) => {
    return (
      microFrontendAppA.appId === microFrontendAppB.appId &&
      microFrontendAppA.version === microFrontendAppB.version
    );
  }
);
