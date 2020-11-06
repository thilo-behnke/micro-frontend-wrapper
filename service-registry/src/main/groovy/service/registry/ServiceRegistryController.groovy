package service.registry

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.reactivex.Single
import service.registry.model.Service

@Controller('/api/services')
class ServiceRegistryController {

    List<Service> SERVICES = [
            new Service(id: 'product-search', url: 'http://product-search/')
    ]

    @Get('/{id}/{version}')
    Single<Service> getService(@PathVariable String id, @PathVariable String version) {
        // TODO: Handle errors.
        return Single.just(SERVICES.find { it.id == id && it.version == version })
    }
}
