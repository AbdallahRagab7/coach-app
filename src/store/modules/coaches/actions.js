export default {
  async registerCoach(context, data) {
    // lw get call ly registerCoach lazm tb2a await registerCoach
    const userId = context.rootGetters.userId
    const coachData = {
      // id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };
  
    //await mean : store the result in response const (only be stored when fetch is done)
    // await is like .then(response) ,, it transformend behind the scene
    // await y3ny ht5ly el code el gwah blocking 
    // fetch return a promise  
   const response = await fetch(`https://coach-app-4fbc5-default-rtdb.firebaseio.com/coaches/${userId}.json` , {
      method : 'PUT' ,
      // to tell firebase that data in there will be overwritten if it existed 
      // or will be created if not exist
      // difference of post >>>>
      // POST : new entry would be added every time , y3ny mmken yb2a 3ndy 2 coachId c3 by data mo5tlfa 
      // i wanna have one coach entry per user
      body : JSON.stringify(coachData)
      // .then(code ) that will be execute once a promise(request) is done
      })

      // const responseData = await response.json(); this line will be execute once request is done
      // response.json return a promise 
      // await : store the result of promise in responseData (only when response.json is done)
      if (!response.ok){
        // error
      }

    context.commit('registerCoach', {
      ...coachData , 
      id : userId 
      // id , will be use to my locally committed data here not on firebase 
      // this will be execute once all the promises are done 
    });
  },


 
};

