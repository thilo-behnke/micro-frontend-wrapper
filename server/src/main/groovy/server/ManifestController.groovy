package server

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.reactivex.Single
import server.model.Manifest

@Controller("/api/manifests")
class ManifestController {

    @Get
    Single<List<Manifest>> getManifests() {
        def manifests = [
                new Manifest(appId: 'my-app', appName: 'MyApp', version: "1.0.1", url: "http://some-url/main.js"),
                new Manifest(appId: 'my-other-app', appName: 'MyOtherApp', version: "0.3.0", url: "http://some-other-url/main.js")
        ]
        return Single.just(manifests)
    }
}
