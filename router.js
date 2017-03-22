'use strict';
const Profile = require("./profile.js");
const renderer = require("./renderer");
const querystring = require("querystring");
const commonHeader = {"Content-Type": "text/html"};


//When URL is blank
function home(request, response) {
    if (request.url === "/") {
        if (request.method.toLowerCase() === "get") {
            response.writeHead(200, commonHeader);
            renderer.view("header", {}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        } else {
            request.on("data", function(postBody){
                var query = querystring.parse(postBody.toString());
                response.writeHead(303, {"Location": "/" + query.username});
                response.end();
            });
            
        }
    }
}

// Function for when url is not blank
function user(request, response) {
    const username = request.url.replace("/", "");
    if (username.length > 0) {
        response.writeHead(200, commonHeader);
        renderer.view("header", {}, response);
        //Get JSON from Treehouse
        const studentProfile = new Profile(username);

        studentProfile.on("end", function(profileJSON) {
            //Show profile
            const values = {
                avatar: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            }            
            //Simple response
            renderer.view("profile", values, response);
            renderer.view("footer", {}, response);
            response.end();
        });

        studentProfile.on("error", function(error) {
            //Show error
            renderer.view("error", {errorMessage: error.message}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        });
   
    }
}

module.exports.home = home;
module.exports.user = user;