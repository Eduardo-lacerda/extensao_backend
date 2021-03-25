
const validation = require("../utils/auth");
var rateController = require('../controllers/rateController.js');

module.exports = function(app) {
    app.get('/rate', validation.auth, rateController.get_rate);
    app.post('/rate', validation.auth, rateController.create_rate);
};