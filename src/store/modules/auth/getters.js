
export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
        // to change string to boolen
    // if there is token = true ,, else false
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  }
};