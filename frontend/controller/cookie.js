const Cookies = require('js-cookie');

const checkToken = (req, res, next) => {
  let token = '';

  if (typeof window !== 'undefined') {
    // Check query string for token
    const params = new URLSearchParams(window.location.search);
    if (params.has('token')) {
      token = params.get('token');
      // Remove token from URL
      params.delete('token');
      const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
      window.history.replaceState({}, '', newUrl);
      // Set token in local storage
      localStorage.setItem('token', token);
    }

    // Check local storage for token
    if (!token) {
      token = localStorage.getItem('token');
    }
  }

  // Check cookie for token
  if (!token) {
    token = Cookies.get('token');
  }

  req.token = token;
  next();
};

module.exports = checkToken;
