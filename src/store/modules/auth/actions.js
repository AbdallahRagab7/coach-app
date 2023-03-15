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

export default {
  async login(context,payload ) {

//return context .. : because(async auth) return promise,  so we return it by login and logout
// to be able wait for response , error ,, so on 
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context,payload ) {
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
      console.log(responseData);//to see what in responseData in fail case
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }    
     console.log(responseData);//to see what in responseData in success case
     
// in every reload vuex loss all data , token , so we should use local storage 
// local storage : api built into the browser
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null
      });
    }
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    });
  }
};
