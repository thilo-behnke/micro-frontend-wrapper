package server.model

import javax.annotation.concurrent.Immutable

@Immutable
class BackendManifest {
    String id
    String name
    String version
    String serviceUrl
}
