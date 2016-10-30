"use strict";
var browserSync = require('browser-sync');
var config_1 = require('../../config');
var runServer = function () {
    browserSync.init(config_1.default.getPluginConfig('browser-sync'));
};
var listen = function () {
    runServer();
};
exports.listen = listen;
var changed = function (files) {
    if (!(files instanceof Array)) {
        files = [files];
    }
    browserSync.reload(files);
};
exports.changed = changed;
//# sourceMappingURL=/home/ns/Downloads/Foods-Sports-master/public/ts-node/ed1841fb803c840ea20fc88f182745027aec28b2/fc0d6f83d2a9542f21a8b57360a7f61a2f641f89.js.map