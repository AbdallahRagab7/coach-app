
export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      // id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };
  
    const token = context.rootGetters.token; // access our rote store
    const response = await fetch(
      `https://coach-app-4fbc5-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + 
      token,
      {
        method: 'PUT',
         // PUT :to tell firebase that data in there will be overwritten if it existed 
      // or will be created if not exist
      // POST : new entry would be added every time , y3ny mmken yb2a 3ndy 2 coachId c3 by data mo5tlfa 
      // i wanna have one coach entry per user
        body: JSON.stringify(coachData)
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }
    context.commit('registerCoach', {
      ...coachData,
      id: userId
       // id , will be use to my locally committed data here not on firebase 
      // this will be execute once all the promises are done 
    });
  },


  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {// if it false , w2f elmethod , don't send request 
      return;
      // if true continue rest of the code
    // 34an msh kol ma a3ml refersh fi coaches page y3ml fetch ly data
    // y3mlha b3d 1 minute
    // spinner will be show after 1 minute
    }

    const response = await fetch(
      `https://coach-app-4fbc5-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();
       // return data 
   // store result of promise (of json())

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;// throws a user defined exception , execution of function after throw , will stop
      // i can handle this error in the component which dispatch this action
    }

    const coaches = [];

    for (const key in responseData) {// key is each coach id 
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');// to store timeStamp when we fetch the data
  }
  };

