const { authJwt } = require("../middleware");
const controller = require("../controllers/asset.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/shoreline/api/assets", controller.getListFiles);
  app.get("/shoreline/api/assets/:name", controller.download);

  app.post("/shoreline/api/assets",[authJwt.verifyToken, authJwt.isAdmin],controller.upload);

  app.delete("/shoreline/api/assets/:name", [authJwt.verifyToken, authJwt.isAdmin],controller.removeSync);

};
