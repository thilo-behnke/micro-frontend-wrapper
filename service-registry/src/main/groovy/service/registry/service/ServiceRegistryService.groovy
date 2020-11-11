package service.registry.service

import io.micronaut.http.annotation.PathVariable
import service.registry.exception.ServiceAlreadyRegisteredException
import service.registry.model.Service

interface ServiceRegistryService {
    List<Service> getServices()
    Optional<Service> getService(String id, String version)
    void registerService(Service service) throws ServiceAlreadyRegisteredException
}
