const interpolate = (value, session = {}, options = {}) => {
    //TODO
    var keys = Object.keys(session);
    var leftDelimiter = options.leftDelimiter;
    var rightDelimiter = options.rightDelimiter;
    var charRegex = '[a-zA-Z_ ]*?'

    if (keys.length > 0) {
        for (var key in session) {
            //regex to obtain the variable to be replaced
            var regex = new RegExp(leftDelimiter + key + rightDelimiter, 'gi');
            value = value.replace(regex, session[key]);
        }
    }
    //when session object is empty replace the text from leftDelimiter to rightDelimiter with ""
    else {
        var substr = new RegExp(leftDelimiter + charRegex + rightDelimiter, 'gi');
        value = value.replace(substr, "");
    }

    return value;
};

module.exports = { interpolate }