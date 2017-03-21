//When URL is blank
function homeRoute(request, response) {
    if (request.url === "/") {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Header\n");
        response.write("Search\n");
        response.end("Footer\n");
    }
}

// Function for when url is not blank
function userRoute(request, response) {
    const username = request.url.replace("/", "");
    if (username.length > 0) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Header\n");
        response.write("Profile: " + request.url + "\n");
        response.end("Footer\n");
    }
}

module.exports.home = homeRoute;
module.exports.user = userRoute;