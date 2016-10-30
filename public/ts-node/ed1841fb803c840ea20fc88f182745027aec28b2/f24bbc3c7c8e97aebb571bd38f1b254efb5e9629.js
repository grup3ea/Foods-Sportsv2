"use strict";
var gulp = require('gulp');
var config_1 = require('../../config');
module.exports = function () {
    return gulp.src(config_1.default.FONTS_SRC)
        .pipe(gulp.dest(config_1.default.FONTS_DEST));
};
//# sourceMappingURL=/home/ns/Downloads/Foods-Sports-master/public/ts-node/ed1841fb803c840ea20fc88f182745027aec28b2/f24bbc3c7c8e97aebb571bd38f1b254efb5e9629.js.map