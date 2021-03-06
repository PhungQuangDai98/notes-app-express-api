const mongoose = require("mongoose");

function DBConnection(uri) {
  let result = mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      //if there are any errors...
      console.error("DB Connection error:", err.stack);
      throw err;
    })
    .then(() => {
      console.log("Connection to MongoDB successfully!");
    });
  return result;
}

module.exports = DBConnection;
