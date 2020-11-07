package service.registry.exception

import grails.gorm.transactions.Transactional
import io.micronaut.context.annotation.Requires
import service.registry.model.Service
import service.registry.service.ServiceRegistryService

import javax.inject.Singleton

@Singleton
@Requires(env = 'prod')
class MongoServiceRegistrationService implements ServiceRegistryService {
    @Override
    Optional<Service> getService(String id, String version) {
        return Optional.ofNullable(Service.findByIdAndServiceVersion(id, version))
    }

    @Override
    @Transactional
    void registerService(Service service) throws ServiceAlreadyRegisteredException {
        def existingService = Service.findByIdAndServiceVersion(service.id, service.serviceVersion)
        if(existingService) {
            throw new ServiceAlreadyRegisteredException(service.id, service.serviceVersion)
        }
        service.insert()
    }
}
