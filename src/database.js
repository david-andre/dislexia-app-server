const mongoose = require("mongoose");
const URI = "mongodb://localhost/dislexia-app";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`BD Conectada`))
  .catch((error) => console.error(error));

module.exports = mongoose;
