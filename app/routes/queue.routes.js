
const { authJwt } = require("../middleware");
const controller = require("../controllers/queue.controller");
module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  const dataset = require("../controllers/queue.controller.js");

  var router = require("express").Router();

  // Retrieve all Tutorials
  router.get("/", dataset.findAll);

  app.use('/shoreline/api/queue', router);


  app.post(
    "/shoreline/api/queue/add", [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOrCreate
  );
  app.get(
    "/shoreline/api/queue/:id",
    controller.findOne
  );
  app.put(
    "/shoreline/api/queue/:id",[authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );
  app.delete(
    "/shoreline/api/queue/:id",[authJwt.verifyToken, authJwt.isAdmin],
    controller.destroy
  );
};