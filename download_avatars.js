var request = require('request');
var GITHUB_USER = "vinaybalaji";
var GITHUB_TOKEN = "5b2f9d1009d65c30fd9f0b3643d169f67a4ca6f8";

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var headers = {
    'User-Agent': 'Github Avatar Downloader - Student Project'
  }
  var options = {
    url: requestURL,
    method: 'GET',
    headers: headers
  }

  request(options, function (error, response, body) {
    console.log(response.statusCode);
    console.log(response.statusMessage);
  })
}

getRepoContributors("jquery", "jquery", function (err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});