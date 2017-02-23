var jquery = require('jquery');
const config = require('./config');

const login = (username, password) => {
  return jquery.ajax({
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
    login(username, password)
    .catch((error) => {
      notify(`Error: ${error.statusText}`);
    });
  });
};

const notify = (message) => {
  const snackbarContainer = document.querySelector('#toast');
  snackbarContainer.MaterialSnackbar.showSnackbar({message});
};

exports.setJquery = (_jquery_) => {
  jquery = _jquery_;
};
exports.login = login;
exports.init = init;
