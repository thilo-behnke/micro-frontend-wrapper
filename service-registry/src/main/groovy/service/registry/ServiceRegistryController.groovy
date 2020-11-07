package service.registry

import io.micronaut.context.annotation.Requires
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.http.annotation.Post
import io.reactivex.Single
import service.registry.exception.ServiceAlreadyRegisteredException
import service.registry.model.Service
import service.registry.service.ServiceRegistryService

import javax.inject.Inject

@Controller('/service-registry-api/services')
class ServiceRegistryController {

    @Inject
    ServiceRegistryService serviceRegistryService

    @Get('/{id}/{version}')
    Single<Service> getService(@PathVariable String id, @PathVariable String version) {
        // TODO: Handle errors.
        return serviceRegistryService.getService(id, version).map(service -> Single.just(service)).orElseGet(() -> null)
    }

    // TODO: Permissions!
    @Post
    HttpResponse registerService(@Body Service service) {
        try {
            serviceRegistryService.registerService(service)
        } catch(ServiceAlreadyRegisteredException ex) {
            return HttpResponse.badRequest(ex.message)
        }
        return HttpResponse.ok()
    }
}
