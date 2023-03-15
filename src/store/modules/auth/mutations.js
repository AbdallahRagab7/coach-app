export default {
  setUser(state, payload) { //to sign up , login .. 34an el 2 nfs el structure fi firebase payload
    state.token = payload.token;
    state.userId = payload.userId;
    // state.tokenExpiration = payload.tokenExpiration;
    state.didLogout= false;
    // so next time it switches to true , we also triggers as watcher again
  } , 
  setAutoLogout(state){
    state.didLogout = true
  }
};