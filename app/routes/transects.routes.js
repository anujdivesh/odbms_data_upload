const { authJwt } = require("../middleware");
const controller = require("../controllers/transects.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/shoreline/api/transects", controller.getListFiles);
  app.get("/shoreline/api/transects/:name", controller.download);

  app.post("/shoreline/api/transects",[authJwt.verifyToken, authJwt.isAdmin],controller.upload);

  app.delete("/shoreline/api/transects/:name", [authJwt.verifyToken, authJwt.isAdmin],controller.removeSync);

};
