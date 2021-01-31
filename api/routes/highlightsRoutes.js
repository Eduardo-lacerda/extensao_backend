module.exports = function(app) {
    var highlights = require('../controllers/highlightsController.js');
    var router = require("express").Router();

    router.get('/',highlights.list_highlights);
    router.post('/',highlights.create_highlight);
/*     router.get('/:highlightId',highlights.read_highlights);
    router.put('/:highlightId',highlights.update_highlight);
    router.delete('/:highlightId',highlights.delete_highlight); */

    app.use('/highlights', router);
};