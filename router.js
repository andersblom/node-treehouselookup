const Profile = require("./profile.js");

//When URL is blank
function home(request, response) {
    if (request.url === "/") {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Header\n");
        response.write("Search\n");
        response.end("Footer\n");
    }
}

// Function for when url is not blank
function user(request, response) {
    const username = request.url.replace("/", "");
    if (username.length > 0) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Header\n");
        
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
            response.write(values.username + " has " + values.badges + " badges\n")
            response.end("Footer\n");
        });

        studentProfile.on("error", function(error) {
            //Show error
            response.write(error.message + "\n");
            response.end("Footer\n");
        });
   
    }
}

module.exports.home = home;
module.exports.user = user;