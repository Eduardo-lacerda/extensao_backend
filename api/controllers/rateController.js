const db = require('../models');
const { success, error, validation } = require("../utils/responseApi");
const { validationResult } = require("express-validator");

var mongoose = require('mongoose');
var Rate = mongoose.model('Rate');
    

exports.get_rate = async (req, res) => {

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
