var request = require('request');
var fs = require('fs');

var GITHUB_USER = "vinaybalaji";
var GITHUB_TOKEN = "5b2f9d1009d65c30fd9f0b3643d169f67a4ca6f8";

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var headers = {
    'User-Agent': 'Github Avatar Downloader - Student Project'
  };
  var options = {
    url: requestURL,
    method: 'GET',
    headers: headers
  };
  request(options, function (error, response, body) {
    if (error) {
      console.log("Error", error);
      return false;
    }
    if (response && response.statusCode !== 200) {
      console.log("Response was not 200!", response);
      return false;
    }
    let data = JSON.parse(body);
    if (data && data.length) {
      data.forEach(cb);
    } else {
      console.log("No data found!");
    }
  });
}

function downloadImageByURL(url, filePath) {
  var requestURL = url + '/' + filePath;
  var options = {
    url: requestURL,
    method: 'GET'
  };
  request(options, function (error, response, body) {
    if (error) {
      console.log("Error", error);
      return false;
    }
    if (response && response.statusCode != 200) {
      console.log("Response was not 200!", response);
      return false;
    }
  }).pipe(fs.createWriteStream('./sample.jpg'));
}

downloadImageByURL('https://avatars2.githubusercontent.com/u/2741?v=3&s=466', 'avatars/kvirani.jpg');

// getRepoContributors("jquery", "jquery", function (result) {
//   console.log(result.avatar_url);
// });