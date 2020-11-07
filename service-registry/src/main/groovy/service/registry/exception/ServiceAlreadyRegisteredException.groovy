package service.registry.exception

class ServiceAlreadyRegisteredException extends Exception {
    ServiceAlreadyRegisteredException(String id, String version) {
        super("Service ${id} with version ${version} is already registered.")
    }
}
