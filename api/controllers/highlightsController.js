const db = require('../models');
var Highlight = db.highlights;

var mongoose = require('mongoose'),
    Highlight = mongoose.model('Highlight');
    

exports.list_highlights = (req, res) => {
    Highlight.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.create_highlight = (req, res) => {
    var newHighlight = new Highlight(req.body);
    newHighlight.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};
