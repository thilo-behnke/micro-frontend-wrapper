package server.model

import grails.gorm.annotation.Entity

import javax.annotation.concurrent.Immutable

@Entity
class ServiceManifest {
    String serviceId
    String serviceVersion

    static mapping = {
        collection "backends"
    }
}
