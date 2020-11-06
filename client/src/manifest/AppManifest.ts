export type AppManifest = {
  appId: string;
  appName: string;
  version: string;
  url: string;
  backends: Backend[];
};

export type Backend = {
  id: String;
  name: String;
  version: String;
  serviceUrl: String;
};
