var orm = require("../config/orm.js");

var burger = {
    all: function(cb) {
        orm.selectAll(function(res) {
            cb(res);
        });
    },

    one: function(name, cb) {
        orm.selectOne(name, function(res) {
            cb(res);
        });
    },

    update: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    }
};

module.exports = burger;