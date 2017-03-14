var request = require('request');
var GITHUB_USER = "vinaybalaji";
var GITHUB_TOKEN = "5b2f9d1009d65c30fd9f0b3643d169f67a4ca6f8";

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function (err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});