var jquery = require('jquery');
const config = require('./config');

const login = (username, password) => {
  jquery.ajax({
    url: `${config.ROCKET_BASE_URL}/api/v1/login`,
    method: 'POST',
    data: {
      username: username,
      password: password,
    }
  });
};

const init = () => {
  jquery('#login').submit((event) => {
    event.preventDefault();
    const username = jquery('#login #username').val();
    const password = jquery('#login #password').val();
    login(username, password);
  });
};

exports.setJquery = (_jquery_) => {
  jquery = _jquery_;
};
exports.login = login;
exports.init = init;
