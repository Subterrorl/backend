const fs = require("fs");

responseUtil = {
  returnFile: function (req, res, filePath) {
    filePath = "./public/json/" + filePath;
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;
      res.json(data);
    });
  },

  returnJSON: function (req, res, filePath, waitTime = 0) {
    filePath = "./public/json/" + filePath;
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;
      jsonData = JSON.parse(data);
      setTimeout(()=>res.json(jsonData), waitTime);
    });
  },

  returnJSONWithChange: function (req, res, filePath, keywork, textChange, waitTime = 0) {
    filePath = "./public/json/" + filePath;
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;

      newData = data.replaceAll(keywork, textChange)
      jsonData = JSON.parse(newData);
      console.log('[returnJSONWithChange]: return');
      setTimeout(()=>res.json(jsonData), waitTime);
    });
  },

  returnJSONWith7DateReplace: function (req, res, filePath, replaceAr, waitTime = 0) {
    filePath = "./public/json/" + filePath;
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;

      for (var key in replaceAr) {
        console.log(`replace: key ${key} => ${replaceAr[key]}`);
        data = data.replaceAll(key, replaceAr[key]);
      }
      
      jsonData = JSON.parse(data);
      setTimeout(()=>res.json(jsonData), waitTime);
    });
  },

  returnHTML: function (req, res, filePath) {
    filePath = "././public/html/" + filePath;
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;
      res.send(data);
    });
  },

  returnErrorJSON500: function (req, res, filePath) {
    filePath = "./public/json/" + filePath;

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;
      jsonData = JSON.parse(data);

      res.status(500);
      res.json(jsonData);
    });
  },

  returnErrorMSG404: function (req, res, filePath) {
    filePath = "./public/json/" + filePath;
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;

      res.status(404);
      res.send(data);
    });
  },

  returnErrorMSG401: function (req, res, filePath) {
    filePath = "./public/json/" + filePath;
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;

      res.status(401);
      res.send(data);
    });
  },

  changeTextInJson: function (jsonFile, keywork, textChange) {

  }
};

module.exports = responseUtil;
