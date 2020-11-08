const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/assets/", { target: "http://localhost:8080" })
  );
  app.use(
    createProxyMiddleware("/manifest-api/", { target: "http://localhost:8080" })
  );
  app.use(
    createProxyMiddleware("/service-registry-api/", {
      target: "http://localhost:8090",
    })
  );
};
