const cookieParser = require("cookie-parser");

const helmet = require("helmet");

const bodyParser = require("body-parser");

const express = require("express");

const middleware = {
  helmet: helmet(),
  bodyParserForm: bodyParser.urlencoded({ extended: false, limit: "50mb" }),
  staticServing: express.static(base_dir + "/public/"),
  bodyParserJSON: bodyParser.json({ limit: "50mb" }),
  cookieParser: cookieParser(),
  okay: (req, res, next) => {
    res.okay = (data) => {
      res.send({
        status: "ok",
        data,
      });
    };
    next();
  },
  error: (req, res, next) => {
    res.error = (data) => {
      res.send({
        status: "error",
        data,
      });
    };
    next();
  },
};

module.exports = () => {
  return middleware;
};
