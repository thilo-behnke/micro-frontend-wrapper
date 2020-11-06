package server

import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.reactivex.Single
import server.model.AppManifest
import server.model.BackendManifest

@Controller("/manifest-api/manifests")
class ManifestController {

    @Get("/")
    Single<List<AppManifest>> getAppManifests() {
        def manifests = [
                new AppManifest(appId: 'simple-js-app', appName: 'Simple JS App', version: "1.0.1", url: "/assets/my-app__1.0.1__023942384.js"),
                new AppManifest(appId: 'other-simple-js-app', appName: 'Other simple JS App', version: "0.3.0", url: "/assets/my-other-app__0.3.0__20394820934.js"),
                new AppManifest(appId: 'product-search-app', appName: 'Product Search', version: "1.0.0", url: "/assets/product-search-app__1.0.0.js", backends: [
                        new BackendManifest(
                                id: 'product-search-api',
                                name: 'Product Search Api',
                                version: '1.0.0'
                        )
                ])
        ]
        return Single.just(manifests)
    }
}
