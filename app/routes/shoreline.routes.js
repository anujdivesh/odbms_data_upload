const { authJwt } = require("../middleware");
const controller = require("../controllers/shoreline.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/shoreline/api/shoreline", controller.getListFiles);
  app.get("/shoreline/api/shoreline/:name", controller.download);

  app.post("/shoreline/api/shoreline",[authJwt.verifyToken, authJwt.isAdmin],controller.upload);

  app.delete("/shoreline/api/shoreline/:name", [authJwt.verifyToken, authJwt.isAdmin],controller.removeSync);

};
