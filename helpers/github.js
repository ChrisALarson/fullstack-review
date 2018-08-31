const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let url = `https://api.github.com/search/repositories?q=user:${username}&sort=updated`;
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, body);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;