package server.model

import grails.gorm.annotation.Entity
import groovy.transform.Immutable

@Entity
class AppManifest {
    String appId
    String appName
    String appVersion
    String appUrl

    List<BackendManifest> backends = []

    static mapping = {
        collection "manifests"
    }
}
