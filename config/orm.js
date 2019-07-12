var connection = require("../config/connection.js");

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

let orm = {
    selectAll: function (cb) {
        let queryString = "SELECT * FROM burgers;";
        connection.query(queryString, function (err, data) {
            if (err) throw err;
            cb(data);
        })

    },
    selectOne: function (selector, cb) {
        let queryString = "SELECT * FROM burgers WHERE burger_name = " + selector + " LIMIT 1;";
        connection.query(queryString, function (err, data) {
            if (err) throw err;
            cb(data);
        })
    },
    updateOne: function (table, objColVals, condition, cb) {
        let queryString = "UPDATE" + table + " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
}

module.exports = orm;