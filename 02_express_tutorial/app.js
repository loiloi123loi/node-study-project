const express = require("express");

const app = express();

const port = 5000;

const logger = require("./logger");
const authorize = require("./authorize");

// app.use([logger, authorize]);
// app.use(logger);
// app.use("/api", logger);

app.use(express.static("./public"));

// req => middleware => res

app.get("/", (req, res) => {
    console.log(req.user);
    res.send("index.html");
});

app.get("/about", (req, res) => {
    console.log(req.user);
    res.send("About Page");
});

app.listen(port, () => {
    console.log("server listen on port " + port);
});
