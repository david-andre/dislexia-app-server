const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParder = require("body-parser");

const app = express();
const { mongoose } = require("./database");

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);
app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

// Routes
app.use("/api/user/children", require("./routes/children.routes"));
app.use("/api/activities", require("./routes/activities.routes"));
app.use("/api/reports", require("./routes/reports.routes"));
app.use("/api/user/supervisor", require("./routes/supervisor.routes"));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Servidor en el puerto ${app.get("port")}`);
});
