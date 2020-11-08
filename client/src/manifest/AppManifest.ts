export type AppManifest = {
  appId: string;
  appName: string;
  version: string;
  url: string;
  backends: Backend[];
};

export type Backend = {
  id: string;
  name: string;
  version: string;
  // TODO: This is optional until the service registry was queried - improve typing.
  serviceUrl?: string;
};
