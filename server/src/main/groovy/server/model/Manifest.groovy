package server.model

import groovy.transform.Immutable

@Immutable
class Manifest {
    String appId
    String appName
    String version
    String url
}
