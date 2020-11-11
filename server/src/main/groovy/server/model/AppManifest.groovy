package server.model

import grails.gorm.annotation.Entity

@Entity
class AppManifest {
    String appId
    String appName
    String appVersion
    String appUrl

    List<ServiceManifest> services = []

    static mapping = {
        collection "manifests"
    }
}
