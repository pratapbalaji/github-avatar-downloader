// Link to required modules
var request = require('request');
var fs = require('fs');

//Define Github user ID and Github Token for Authorization
var GITHUB_USER = "vinaybalaji";
var GITHUB_TOKEN = "5b2f9d1009d65c30fd9f0b3643d169f67a4ca6f8";

//Welcome message for Program
console.log("Welcome to the Github Avatar Downloader!");

//Function to get a list of contributors (as objects) for the supplied repo owner and repo name
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

//Function to download avatar images for the supplied URL's and save the images to the file path specified.
function downloadImageByURL(url, filePath) {
  var requestURL = url;
  var options = {
    url: requestURL,
    method: 'GET'
  };
  if (!fs.existsSync('./avatars')) {
    fs.mkdir('./avatars');
    }
  request(options, function (error, response, body) {
    if (error) {
      console.log("Error", error);
      return false;
    }
    if (response && response.statusCode != 200) {
      console.log("Response was not 200!", response);
      return false;
    }
  }).pipe(fs.createWriteStream(filePath));
}

//Get command line input for repo owner name and repo name
var owner = process.argv[2];
var repo = process.argv[3];

//Error handling if the user does not input repo owner and repo name
if (owner && repo) {
  getRepoContributors(owner, repo, function (result) {
   downloadImageByURL(result.avatar_url, 'avatars/' + result.login + '.jpg');
});
} else {
  console.log("You must supply the repo owner followed by repo name.")
}

