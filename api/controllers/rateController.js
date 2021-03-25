const db = require('../models');
const { success, error, validation } = require("../utils/responseApi");
const { validationResult } = require("express-validator");

var mongoose = require('mongoose');
var Rate = mongoose.model('Rate');
    
exports.get_rate = async (req, res) => {
    try {
        if(req.query['pageUrl'] && req.query['baseUrl']) {
            var baseRate = await Rate.aggregate(
                [
                    {
                        $match: {"base_url": req.query.baseUrl}
                    },
                    {
                        $group: {
                            _id: "$base_url",
                            average: {$avg: "$rate_number"}
                        }
                    }
                ], 
                function(err, register){
                    if (err) {
                        res.status(500).json(error("Server error", res.statusCode));
                }
            });

            var pageRate = await Rate.aggregate(
                [                    
                    {
                        $match: {"page_url": req.query.pageUrl}
                    },
                    {
                        $group: {
                            _id: "$page_url",
                            average: {$avg: "$rate_number"}
                        }
                }
                ], 
                function(err, register){
                    if (err) {
                        res.status(500).json(error("Server error", res.statusCode));
                }
            });

            var comments = await Rate.find({page_url: req.query.pageUrl}, 'rate_number comment user_name user_email creation_date', function(err, register){
                if (err) {
                    res.status(500).json(error("Server error", res.statusCode));
                }
            }).sort({creation_date: 'descending'});
            

            if(baseRate && pageRate && comments) {
                var rate = {
                    base_rate: baseRate[0].average,
                    page_rate: pageRate[0].average,
                    comments: comments
                }
                res
                .status(200)
                .json(success('get_rate_success', { rate }, res.statusCode));
            }
        }
        else {
            res.status(400).json(error("Missing Parameters"));
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.create_rate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));

    try {
        req.body['user_email'] = req.user.email;
        req.body['user_name'] = req.user.name;
        var newRate = new Rate(req.body);
        await newRate.save();

        res.status(201).json(
            success(
                "rate_creation_success",
                {
                    id: newRate._id,
                    rate_number: newRate.rate_number,
                    comment: newRate.comment,
                    page_url: newRate.page_url,
                    base_url: newRate.base_url,
                    user_email: newRate.user_email,
                    user_name: newRate.user_name,
                    creation_date: newRate.creation_date,
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};
