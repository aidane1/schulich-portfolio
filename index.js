global.base_dir = __dirname;
global.abs_path = function (path) {
  return base_dir + path;
};

global.include = function (file) {
  return require(abs_path("/" + file));
};

const config = include("config.json");

const NODE_ENVS = ["production", "development"];

const configData =
  config[
    NODE_ENVS.indexOf(process.env.NODE_ENV) >= 0
      ? process.env.NODE_ENV
      : NODE_ENVS[0]
  ];

global.server_info = {
  config: configData,
};

const database = include("/database/database");

const app = include("/app/server");


database()
  .then(async () => {
    app();
  })
  .catch((e) => {
    console.log(e);
    console.log("server did not bind successfully");
  });
