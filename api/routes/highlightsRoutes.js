module.exports = function(app) {
    var highlights = require('../controllers/highlightsController.js');
    var router = require("express").Router();

    app.get('/highlights',highlights.list_highlights);
    app.post('/highlights',highlights.create_highlight);
/*     router.get('/:highlightId',highlights.read_highlights);
    router.put('/:highlightId',highlights.update_highlight);
    router.delete('/:highlightId',highlights.delete_highlight); */

    const customDomainReroute = require('@turinggroup/serverless-express-custom-domain-middleware').customDomainReroute;
    app.use(customDomainReroute);
};