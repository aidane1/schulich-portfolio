const express = require("express");
const router = express.Router();

const Leader = include("/models/leader");

router.get("/", async (req, res) => {
  try {
	let leaders = await Leader.find({});
	leaders.sort((a,b) => (a.school > b.school) ? 1 : ((b.school > a.school) ? -1 : 0)); 
    res.render("index", { leaders, query: req.query });
  } catch (e) {
    console.log(e);
    res.render("index", { leaders: [], query: req.query });
  }
});

let serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj[p]) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

router.post("/", async (req, res) => {
  try {
    if (
      req.body.name &&
      req.body.email &&
      req.body.phone &&
      req.body.school &&
      req.body.bio
    ) {
      let leader = await Leader.create(req.body);
      res.redirect(
        `/?success=true&message=${encodeURIComponent(
          "Success! Leader has been added"
        )}`
      );
    } else {
      res.redirect(
        `/?success=false&message=${encodeURIComponent(
          "Error: All fields required"
        )}&${serialize(req.body)}`
      );
    }
  } catch (e) {
    console.log(e);
    res.redirect(
      `/?success=false$message=${encodeURIComponent(
        "Error: An unknown error occured"
      )}&${serialize(req.body)}`
    );
  }
});

module.exports = router;
