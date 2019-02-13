const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");

app.use((req, resp, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile("server.log", log + "\n", err => {
    if (err) console.log("Unable to append to server log.");
  });
  console.log(log);
  next();
});

// app.use((req, resp, next) => {
//   resp.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("toUpper", text => {
  return text.toUpperCase();
});

app.get("/", (req, resp) => {
  resp.render("home.hbs", {
    pageTitle: "Home Page",
    message: "Darkness will prevail!"
  });
});

app.get("/about", (req, resp) => {
  resp.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, resp) => {
  resp.send({
    error: {
      message: "Francis destroyed the internet"
    }
  });
});

app.listen(port, () => {
  console.log(`Server listeing on port ${port}`);
});
