import { Observable } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { map, switchMap } from "rxjs/operators";

export type Service = {
  id: string;
  version: string;
  url: string;
};
export interface ServiceRegistryHandler {
  getService(id: string, version: string): Observable<Service>;
}

export class DefaultServiceRegistryHandler implements ServiceRegistryHandler {
  getService(id: string, version: string): Observable<Service> {
    return fromFetch(`/service-registry-api/services/${id}/${version}`).pipe(
      switchMap((res) => res.json())
    );
  }
}
