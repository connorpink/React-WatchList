const connection = require("../config/connectMongo");

function processQuery(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, function (err, result) {
      err ? reject(err) : resolve(result);
    });
  });
}

module.exports = processQuery;
