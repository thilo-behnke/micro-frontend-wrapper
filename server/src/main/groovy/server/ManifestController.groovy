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
                new Manifest(appId: 'simple-js-app', appName: 'Simple JS App', version: "1.0.1", url: "/assets/my-app__1.0.1__023942384.js"),
                new Manifest(appId: 'other-simple-js-app', appName: 'Other simple JS App', version: "0.3.0", url: "/assets/my-other-app__0.3.0__20394820934.js"),
                new Manifest(appId: 'svelte-app', appName: 'Svelte App', version: "2.0.1", url: "/assets/my-svelte-app__2.0.1__2903842034.js")
        ]
        return Single.just(manifests)
    }
}
