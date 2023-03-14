export default {
  async login(context, payload) {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-yNrAnSmafZFSirNN8cjPLBlPjrVtg_8', {
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
      const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
      throw error;
    }

    console.log(responseData);//to see what in responseData in success case

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
    
  },

  async signup(context, payload) {//send a request to create a new user
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-yNrAnSmafZFSirNN8cjPLBlPjrVtg_8', {
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
      const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
      throw error;
    }

    console.log(responseData);//to see what in responseData in success case

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  },
  logout(context){
   context.commit('setUser' , {
    token : null , 
    userId : null ,
    tokenExpiration : null,
   }) 
  }
};