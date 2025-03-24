var express = require("express");
var router = express.Router();
var responseUtil = require("../../util/responseUtil");

const fs = require("fs");

router.get("/menulist", function (req, res, next) {
  responseUtil.returnJSON(req, res, 'menus/menu-list.json');
});

module.exports = router;
