export type AppManifest = {
  appId: string;
  appName: string;
  appVersion: string;
  appUrl: string;
  services: ServiceManifest[];
};

export type ServiceManifest = {
  serviceId: string;
  serviceName?: string;
  serviceVersion: string;
  // TODO: This is optional until the service registry was queried - improve typing.
  serviceUrl?: string;
};
