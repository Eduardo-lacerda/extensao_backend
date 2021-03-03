const db = require('../models');
var Highlight = db.highlights;
const { success, error, validation } = require("../utils/responseApi");
const { randomString } = require("../utils/common");
const { validationResult } = require("express-validator");

var mongoose = require('mongoose');
var Highlight = mongoose.model('Highlight');
    

exports.list_highlights = async (req, res) => {
    try {
        var highlights = await Highlight.find({}, function(err, register){
            if (err) {
                res.status(500).json(error("Server error", res.statusCode));
            }
        });

        if(highlights) {
            res
            .status(200)
            .json(success('list_highlights', { highlights }, res.statusCode));
        }
    } catch (err) {
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.create_highlight = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));

    try {
        var newHighlight = new Highlight(req.body);
        await newHighlight.save();

        res.status(201).json(
            success(
                "highlight_creation_success",
                {
                    id: newHighlight._id,
                    xpath: newHighlight.xpath,
                    text: newHighlight.text,
                    url: newHighlight.url,
                    icon_url: newHighlight.icon_url,
                    color: newHighlight.color,
                    creation_date: newHighlight.creation_date,
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};
