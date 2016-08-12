var fs = require("fs");
var browserify = require("browserify");
browserify("./index.js")
    .transform("babelify", {presets: ["es2015", "react", "stage-2"]})
    .bundle()
    .pipe(fs.createWriteStream("./web/bundle.js"));
