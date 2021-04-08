
const validation = require("../utils/auth");
var highlightsController = require('../controllers/highlightsController.js');

module.exports = function(app) {
    app.get('/highlights', validation.auth, highlightsController.list_highlights);
    app.get('/highlights/others', highlightsController.list_others_highlights);
    app.get('/highlights/others/authenticated', validation.auth, highlightsController.list_others_highlights_authenticated);
    app.post('/highlights', validation.auth, highlightsController.create_highlight);
    app.delete('/highlights/:highlightId', validation.auth, highlightsController.delete_highlight);
};