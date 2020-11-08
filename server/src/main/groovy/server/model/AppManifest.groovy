package server.model

import groovy.transform.Immutable

@Immutable
class AppManifest {
    String appId
    String appName
    String version
    String url

    List<BackendManifest> backends = []
}
