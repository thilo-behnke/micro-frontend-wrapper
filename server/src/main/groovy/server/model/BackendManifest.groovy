package server.model

import grails.gorm.annotation.Entity

import javax.annotation.concurrent.Immutable

@Entity
class BackendManifest {
    String backendId
    String backendVersion

    static mapping = {
        collection "backends"
    }
}
