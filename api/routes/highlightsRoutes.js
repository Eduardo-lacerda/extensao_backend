
const validation = require("../utils/auth");
var highlightsController = require('../controllers/highlightsController.js');

module.exports = function(app) {
    app.get('/highlights', validation.auth, highlightsController.list_highlights);
    app.post('/highlights', validation.auth, highlightsController.create_highlight);
/*     router.get('/:highlightId',highlights.read_highlights);
    router.put('/:highlightId',highlights.update_highlight);
    router.delete('/:highlightId',highlights.delete_highlight); */

/*     const customDomainReroute = require('@turinggroup/serverless-express-custom-domain-middleware').customDomainReroute;
    app.use(customDomainReroute); */
};