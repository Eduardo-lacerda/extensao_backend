const dbConfig = require("../../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.highlights = require("./highlightsModel.js")(mongoose);
db.users = require("./userModel.js")(mongoose);
db.verification = require("./verificationModel.js")(mongoose);

module.exports = db;