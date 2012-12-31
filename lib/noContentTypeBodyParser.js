var qs = require("qs");

module.exports.middleware = function(req, res, next) {
    if (!req.get('Content-Type')) {
        //explicit no content type or IE9 or lower removed the content type for a post query
        var buf = "";
        req.setEncoding("utf8");
        req.on("data", function(chunk) {
            buf += chunk;
        });

        req.on("end", function() {
            try {
                req.body = JSON.parse(buf);
            }
            catch (e) {
                //not json
                req.body = qs.parse(buf);
            }

            next();
        });
    }
    else
        next();
};