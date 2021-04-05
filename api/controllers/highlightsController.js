const db = require('../models');
const { success, error, validation } = require("../utils/responseApi");
const { randomString } = require("../utils/common");
const { validationResult } = require("express-validator");

var mongoose = require('mongoose');
var Highlight = mongoose.model('Highlight');
    

exports.list_highlights = async (req, res) => {
    try {
        var conditions = {user_email: req.user.email};
        if(req.query['text']) {
            conditions['text'] = { "$regex": req.query.text, "$options": "i" };
        }
        if(req.query.url) {
            conditions['url'] = req.query.url;
        }

        var highlights = await Highlight.find(conditions, function(err, register){
            if (err) {
                res.status(500).json(error("Server error", res.statusCode));
            }
        }).sort({creation_date: 'descending'});

        if(highlights) {
            res
            .status(200)
            .json(success('list_highlights', { highlights }, res.statusCode));
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.create_highlight = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));

    try {
        req.body['user_email'] = req.user.email;
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
                    user_email: req.user.email
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.delete_highlight = async (req, res) => {
    try {
        await Highlight.remove({_id: req.params.highlightId}, function(err) {
            if(err)
                res.status(500).json(error("Server error", res.statusCode));
            else {
                res.status(201).json(
                    success(
                        "highlight_delete_success", null, res.statusCode
                    )
                );
            }
        });
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};