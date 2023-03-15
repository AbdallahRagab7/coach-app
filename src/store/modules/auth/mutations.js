export default {
  setUser(state, payload) { 
  // to store user data in vuex , in case login , signup 
  // login , signup have same strucure so , we make only one method for both
    state.token = payload.token;
    state.userId = payload.userId;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;

  }
};