
const validation = require("../utils/auth");
var highlightsController = require('../controllers/highlightsController.js');

module.exports = function(app) {
    app.get('/highlights', validation.auth, highlightsController.list_highlights);
    app.post('/highlights', validation.auth, highlightsController.create_highlight);
    //router.get('/:highlightId',highlightsController.read_highlights);
    //router.put('/:highlightId',highlightsController.update_highlight);
    app.delete('/highlights/:highlightId', validation.auth, highlightsController.delete_highlight);

/*     const customDomainReroute = require('@turinggroup/serverless-express-custom-domain-middleware').customDomainReroute;
    app.use(customDomainReroute); */
};