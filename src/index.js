const express = require("express");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const helmet = require("./middlewares/helmet.js");

const routes = require("./routes");

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(helmet);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views/`);
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "main",
    partialsDir: `${__dirname}/views/partials/`,
    layoutsDir: `${__dirname}/views/layouts/`
  })
);

app.use(express.static(`${__dirname}/../static`));
app.use(favicon(`${__dirname}/../static/img/favicon.ico`));

app.use(routes);

app.use((req, res) => {
  res.status(404).render("error");
});

app.listen(port, () => {
  if (app.get("env") === "development") {
    const browserSync = require("browser-sync"); // eslint-disable-line
    browserSync({
      files: [
        `${__dirname}/../static/css/*.css`,
        `${__dirname}/views/**/*.hbs`
      ],
      online: false,
      port: port + 1,
      proxy: `localhost:${port}`,
      ui: false
    });
  }
});
