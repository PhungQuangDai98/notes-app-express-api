const app = require("./src/config/express.js");
const routers = require("./src/routers");
const DBConnection = require("./src/config/mongoose.js");
const { MONGODB_URI } = require("./src/config/config.js");
require("dotenv").config();

const PORT = process.env.PORT || 5050;

DBConnection(MONGODB_URI)
  .then(() => {
    console.log("Connect mongodb ok");
  })
  .catch((error) => {
    console.log("Connect mongodb fail");
    console.log(error.message);
  });

app.use(routers);

app.listen(PORT, () => {
  const hostname = require("os").hostname();
  console.log(`Notes app server running on port: ${process.env.PORT}`);
  console.log(`Host name: http://${hostname}:${process.env.PORT}`);
});
