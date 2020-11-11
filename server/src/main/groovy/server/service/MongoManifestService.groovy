package server.service

import grails.gorm.transactions.Transactional
import io.micronaut.context.annotation.Requires
import server.exception.AppAlreadyRegisteredException
import server.model.AppManifest

import javax.inject.Singleton

@Singleton
@Requires(env = ['prod', 'docker_dev'])
class MongoManifestService implements ManifestService {
    @Override
    List<AppManifest> getManifests() {
        return AppManifest.findAll()
    }

    @Override
    @Transactional
    void registerApp(AppManifest manifest) throws AppAlreadyRegisteredException {
        def existingAppManifest = AppManifest.findByAppIdAndAppVersion(manifest.appId, manifest.appVersion)
        if(existingAppManifest) {
            throw new AppAlreadyRegisteredException(manifest.appId, manifest.appVersion)
        }
        manifest.insert(failOnError: true)
    }
}
