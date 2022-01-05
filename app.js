require("./Config/database");
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let apiRoutes = require("./routes/api-routes");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 4000;
app.use("/api", apiRoutes);
app.listen(port, function () {
  console.log("Running on port " + port);
});
module.exports = app;
