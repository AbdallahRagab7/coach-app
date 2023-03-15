// export default {
//   async login(context, payload) {
//     const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-yNrAnSmafZFSirNN8cjPLBlPjrVtg_8', {
//       method: 'POST',
//       body: JSON.stringify({
//         email: payload.email,
//         password: payload.password,
//         returnSecureToken: true
//       })
//     });

//     const responseData = await response.json();

//     if (!response.ok) {
//       console.log(responseData);//to see what in responseData in fail case
//       const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
//       throw error;
//     }

//     console.log(responseData);//to see what in responseData in success case

//     context.commit('setUser', {
//       token: responseData.idToken,
//       userId: responseData.localId,
//       tokenExpiration: responseData.expiresIn
//     });
    
//   },

//   async signup(context, payload) {//send a request to create a new user
//     const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-yNrAnSmafZFSirNN8cjPLBlPjrVtg_8', {
//       method: 'POST',
//       body: JSON.stringify({
//         email: payload.email,
//         password: payload.password,
//         returnSecureToken: true
//       })
//     });

//     const responseData = await response.json();

//     if (!response.ok) {
//       console.log(responseData);//to see what in responseData in fail case
//       const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
//       throw error;
//     }

//     console.log(responseData);//to see what in responseData in success case

//     context.commit('setUser', {
//       token: responseData.idToken,
//       userId: responseData.localId,
//       tokenExpiration: responseData.expiresIn
//     });
//   },
//   logout(context){
//    context.commit('setUser' , {
//     token : null , 
//     userId : null ,
//     tokenExpiration : null,
//    }) 
//   }
// };




// refactor methods ,, avoid duplicate code in login , signup
let timer;
export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-yNrAnSmafZFSirNN8cjPLBlPjrVtg_8';

    if (mode === 'signup') {
      url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-yNrAnSmafZFSirNN8cjPLBlPjrVtg_8';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }
// in every reload vuex loss all data , token , so we should use local storage 
// local storage : api built into the browser
 // + : to convert string to number , * 1000 to convert second to milliseconds
 // default token expires after 3600 second
    // const expiresIn = +responseData.expiresIn * 1000;
    const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {// store in variable , to clearTimeout(timer) in logout
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {// y3ny current time 3da el future expires time
      return;
    }

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
