const { authJwt } = require("../middleware");
const controller = require("../controllers/satellite.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/shoreline/api/satellite_file", controller.getListFiles);
  app.get("/shoreline/api/satellite_file/:name", controller.download);

  app.post("/shoreline/api/satellite",[authJwt.verifyToken, authJwt.isAdmin],controller.upload);

  app.delete("/shoreline/api/satellite_file/:name", [authJwt.verifyToken, authJwt.isAdmin],controller.removeSync);

};
