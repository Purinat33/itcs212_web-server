// Require the js-cookie module
const Cookies = require('js-cookie');

// Declare a function named checkToken that takes in a request object, a response object, and a callback function named next
const checkToken = (req, res, next) => {
  // Initialize a variable named token with an empty string
  let token = '';

  // Check if the code is running in a browser environment
  if (typeof window !== 'undefined') {
    // If there is a token in the query string of the URL
    const params = new URLSearchParams(window.location.search);
    if (params.has('token')) {
      // Set the token variable to the token value from the query string
      token = params.get('token');

      // Remove the token parameter from the URL
      params.delete('token');
      const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;

      // Replace the current URL in the browser's history with the new URL without the token parameter
      window.history.replaceState({}, '', newUrl);

      // Set the token in local storage
      localStorage.setItem('token', token);
    }

    // If there is no token in the query string, check local storage for a token
    if (!token) {
      token = localStorage.getItem('token');
    }
  }

  // If there is no token in local storage, check for a token in the cookies
  if (!token) {
    token = Cookies.get('token');
  }

  // Set the token value in the request object
  req.token = token;

  // Call the callback function named next
  next();
};

// Export the checkToken function so it can be used in other modules
module.exports = checkToken;
