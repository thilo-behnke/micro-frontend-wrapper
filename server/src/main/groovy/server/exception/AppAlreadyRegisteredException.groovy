package server.exception

class AppAlreadyRegisteredException extends Exception {
    AppAlreadyRegisteredException(String id, String version) {
        super("App ${id} with version ${version} is already registered.")
    }
}
