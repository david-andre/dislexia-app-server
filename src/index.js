const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const { mongoose } = require("./database");

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/users/children", require("./routes/children.routes"));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Servidor en el puerto ${app.get("port")}`);
});
