function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);
  
      req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        console.log(req);
        if (req.status === 200) {
          // Resolve the promise with the response text
          resolve(JSON.parse(req.response));
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText));
        }
      };
  
      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };
  
      // Make the request
      req.send();
    });
  }

  export function getGitHubAccount(userLogin) {

    return get(`https://api.github.com/users/${userLogin}`)
        .then(function(response) {
            console.log('then in get');
            return response;
        })
}
