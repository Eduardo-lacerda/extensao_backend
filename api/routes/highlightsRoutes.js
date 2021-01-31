module.exports = function(app) {
    var highlights = require('../controllers/highlightsController.js');
    var router = require("express").Router();

    router.get('/extensao_api',highlights.list_highlights);
    router.post('/extensao_api',highlights.create_highlight);
/*     router.get('/:highlightId',highlights.read_highlights);
    router.put('/:highlightId',highlights.update_highlight);
    router.delete('/:highlightId',highlights.delete_highlight); */

    app.use('/extensao_api/highlights', router);
    const customDomainReroute = require('@turinggroup/serverless-express-custom-domain-middleware').customDomainReroute;
};