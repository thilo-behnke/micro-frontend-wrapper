package service.registry.service

import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import io.micronaut.context.annotation.Requires
import service.registry.exception.ServiceAlreadyRegisteredException
import service.registry.model.Service
import service.registry.service.ServiceRegistryService

import javax.inject.Singleton

@Singleton
@Requires(env = 'dev')
class FileServiceRegistryService implements ServiceRegistryService {

    private String filename = '.service-registry.json'

    @Override
    Optional<Service> getService(String id, String version) {
        def services = loadServices()
        def matchingService = services.find {it.id == id && it.serviceVersion == version}
        return Optional.ofNullable(matchingService)
    }

    @Override
    void registerService(Service service) throws ServiceAlreadyRegisteredException {
        def services = loadServices()
        def existingService = services.find {it.id == service.id && it.serviceVersion == service.serviceVersion}
        if(existingService) {
            throw new ServiceAlreadyRegisteredException(service.id, service.serviceVersion)
        }
        services.add(service)
        saveServices(services)
    }
    
    private List<Service> loadServices() {
        def jsonSlurper = new JsonSlurper()
        return (List<Service>) jsonSlurper.parse(new File(filename))
    }

    private void saveServices(List<Service> services) {
        def json = JsonOutput.toJson(services)
        def jsonBeautified = JsonOutput.prettyPrint(json)
        File file = new File(filename)
        file.write(jsonBeautified)
    }
}
