package server.model

import grails.gorm.annotation.Entity

import javax.annotation.concurrent.Immutable

@Entity
class BackendManifest {
    String id
    String name
    String version

    static mapping = {
        collection "backends"
    }
}
