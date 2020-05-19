const express = require("express");

const app = express();

const middleware = include("app/middleware/middleware");

// const session = include("app/session/session");

const routes = [
  {
    path: "/",
    component: require(__dirname + "/routes/index"),
  },
];

module.exports = () => {
  let middlewareBody = middleware();
  for (var key in middlewareBody) {
    app.use(middlewareBody[key]);
  }

//   app.use(session());

  app.set("view engine", "ejs");

  routes.forEach((route) => {
    app.use(route.path, route.component);
  });


  app.listen(server_info.config.node_port, () => {
    console.log("app is listening on port " + server_info.config.node_port);
  });
};
