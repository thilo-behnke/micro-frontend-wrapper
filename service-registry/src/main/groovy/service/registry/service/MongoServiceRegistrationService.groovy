package service.registry.service

import grails.gorm.transactions.Transactional
import io.micronaut.context.annotation.Requires
import service.registry.exception.ServiceAlreadyRegisteredException
import service.registry.model.Service

import javax.inject.Singleton

@Singleton
@Requires(env = 'prod')
class MongoServiceRegistrationService implements ServiceRegistryService {

    @Override
    List<Service> getServices() {
        return Service.findAll()
    }

    @Override
    Optional<Service> getService(String id, String version) {
        return Optional.ofNullable(Service.findByServiceIdAndServiceVersion(id, version))
    }

    @Override
    @Transactional
    void registerService(Service service) throws ServiceAlreadyRegisteredException {
        def existingService = Service.findByServiceIdAndServiceVersion(service.serviceId, service.serviceVersion)
        if(existingService) {
            throw new ServiceAlreadyRegisteredException(service.serviceId, service.serviceVersion)
        }
        service.insert(failOnError: true)
    }
}
