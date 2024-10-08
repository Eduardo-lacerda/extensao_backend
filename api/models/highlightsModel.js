module.exports = mongoose => {
    var HighlightSchema = mongoose.Schema({
        xpath: {
            type: Object,
            required: 'Kindly enter the xpath'
        },
        text: {
            type: String,
            required: 'Kindly enter the text'
        },
        url: {
            type: String,
            required: 'Kindly enter the url'
        },
        icon_url: {
            type: String,
            required: 'Kindly enter the icon url'
        },
        creation_date: {
            type: Date,
            default: Date.now
        },
        color: {
            type: [{
                type: String,
                enum: ['yellow', 'orange', 'green']
            }],
            default: ['yellow']
        },
        user_email: {
            type: String,
            required: 'Kindly enter the email'
        },
    });
      
    const Highlight = mongoose.model('Highlight', HighlightSchema);
    return Highlight;
};
