package server

import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.reactivex.Single
import server.exception.AppAlreadyRegisteredException
import server.model.AppManifest
import server.service.ManifestService

import javax.inject.Inject

@Controller("/manifest-api/manifests")
class ManifestController {

    @Inject
    private ManifestService manifestService

    @Get("/")
    Single<List<AppManifest>> getAppManifests() {
        def manifests = manifestService.manifests
        return Single.just(manifests)
    }

    // TODO: Permissions!
    @Post
    HttpResponse registerService(@Body AppManifest appManifest) {
        try {
            manifestService.registerApp(appManifest)
        } catch(AppAlreadyRegisteredException ex) {
            return HttpResponse.badRequest(ex.message)
        }
        return HttpResponse.ok()
    }
}
