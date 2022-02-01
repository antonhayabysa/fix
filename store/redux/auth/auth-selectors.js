const getIsAuthenticated = state => state.auth.isAuthenticated;

const getInfo = state => state.auth.user;
const getError = state => state.auth.error;

const getToken = state => state.auth.token;

///const getLoggedVia = state => state.auth.loggedVia;

export default {
  getIsAuthenticated,
  getInfo,
  getError,
  getToken,
};
