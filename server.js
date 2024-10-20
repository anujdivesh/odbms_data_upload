const express = require("express");
const cors = require("cors");

const app = express();

global.__basedir = __dirname;


// parse requests of content-type - application/json
app.use(express.json({ limit: '2000mb'}));
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '2000mb',extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync().then(() => {
  //initial();
});

// simple route
app.get("/shoreline", (req, res) => {
  res.json({ message: "Welcome to shoreline change application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/upload.routes')(app);
require('./app/routes/satellite.routes')(app);
require('./app/routes/asset.routes')(app);
require('./app/routes/shoreline.routes')(app);
require('./app/routes/transects.routes')(app);
require('./app/routes/queue.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8086;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "adminyuiojns!ks627aksah"
  });
}