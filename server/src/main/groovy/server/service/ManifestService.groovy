package server.service

import server.exception.AppAlreadyRegisteredException
import server.model.AppManifest

interface ManifestService {
    List<AppManifest> getManifests()
    void registerApp(AppManifest manifest) throws AppAlreadyRegisteredException
}
