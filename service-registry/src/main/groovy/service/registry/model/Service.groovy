package service.registry.model

import grails.gorm.annotation.Entity

@Entity
class Service {
    String serviceId
    String serviceName
    String serviceVersion
    String serviceUrl

    static mapping = {
        collection "services"
    }

    static constraints = {
        serviceId nullable: false, blank: false
        serviceName nullable: false, blank: false
        serviceVersion nullable: false, blank: false
        serviceUrl nullable: false, blank: false
    }
}
