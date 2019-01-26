const express = require("express");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");

const homeRouter = require("./src/routes/home.js");
const aboutRouter = require("./src/routes/about.js");
const blogsRouter = require("./src/routes/blogs.js");
const contactRouter = require("./src/routes/contact.js");
const coursesRouter = require("./src/routes/courses.js");
const learnRouter = require("./src/routes/learn.js");
const supportRouter = require("./src/routes/support.js");
const workshopsRouter = require("./src/routes/workshops.js");
const subscribeRouter = require("./src/routes/subscribe.js");

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.set("view engine", "hbs");
app.engine("hbs", hbs({ extname: "hbs", defaultLayout: "main" }));

app.use(express.static(`${__dirname}/static`));
app.use(favicon(`${__dirname}/static/img/favicon.ico`));

app.use(homeRouter.router);
app.use(aboutRouter);
app.use(blogsRouter);
app.use(contactRouter);
app.use(coursesRouter);
app.use(learnRouter);
app.use(supportRouter);
app.use(workshopsRouter);
app.use(subscribeRouter);

app.use((req, res) => {
  res.status(404).render("error");
});

app.listen(port, () => {
  if (app.get("env") === "development") {
    const browserSync = require("browser-sync"); // eslint-disable-line
    browserSync({
      files: ["static/**/*.css", "views/**/*.handlebars"],
      online: false,
      port: port + 1,
      proxy: `localhost:${port}`,
      ui: false
    });
  }
});
