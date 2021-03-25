module.exports = mongoose => {
    var RateSchema = mongoose.Schema({
        rate_number: {
            type: Number,
            required: ''
        },
        comment: {
            type: String,
            required: ''
        },
        page_url: {
            type: String,
            required: 'Kindly enter the url'
        },
        base_url: {
            type: String,
            required: 'Kindly enter the icon url'
        },
        creation_date: {
            type: Date,
            default: Date.now
        },
        user_email: {
            type: String,
            required: 'Kindly enter the email'
        },
        user_name: {
            type: String,
            required: 'Kindly enter the email'
        },
    });
      
    const Rate = mongoose.model('Rate', RateSchema);
    return Rate;
};
