package service.registry.model

import grails.gorm.annotation.Entity

@Entity
class Service {
    String id
    String serviceVersion
    String url

    static mapping = {
        collection "services"
    }

    static constraints = {
        id nullable: false, blank: false
        serviceVersion nullable: false, blank: false
        url nullable: false, blank: false
    }
}
