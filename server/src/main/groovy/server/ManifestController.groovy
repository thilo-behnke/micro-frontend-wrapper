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
                new Manifest(appId: 'my-app', appName: 'MyApp', version: "1.0.1", url: "http://localhost:8080/assets/my-app__1.0.1__023942384.js"),
                new Manifest(appId: 'my-other-app', appName: 'MyOtherApp', version: "0.3.0", url: "http://localhost:8080/assets/my-other-app__0.3.0__20394820934.js")
        ]
        return Single.just(manifests)
    }
}
