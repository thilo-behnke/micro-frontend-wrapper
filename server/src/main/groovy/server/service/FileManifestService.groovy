package server.service

import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import io.micronaut.context.annotation.Requires
import server.exception.AppAlreadyRegisteredException
import server.model.AppManifest

import javax.inject.Singleton

@Singleton
@Requires(env = 'dev')
class FileManifestService implements ManifestService {

    private String filename = '.app-manifests.json'

    @Override
    List<AppManifest> getManifests() {
        def apps = loadManifests()
        return apps
    }

    @Override
    void registerApp(AppManifest appManifest) throws AppAlreadyRegisteredException {
        def appManifests = loadManifests()
        def existingManifest = appManifests.find {it.appId == appManifest.appId && it.appVersion == appManifest.appVersion}
        if(existingManifest) {
            throw new AppAlreadyRegisteredException(appManifest.appId, appManifest.appVersion)
        }
        appManifests.add(appManifest)
        saveAppManifests(appManifests)
    }

    private List<AppManifest> loadManifests() {
        def jsonSlurper = new JsonSlurper()
        return (List<AppManifest>) jsonSlurper.parse(new File(filename))
    }

    private void saveAppManifests(List<AppManifest> appManifest) {
        def json = JsonOutput.toJson(appManifest)
        def jsonBeautified = JsonOutput.prettyPrint(json)
        File file = new File(filename)
        file.write(jsonBeautified)
    }
}
