export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {// use it to show or hide register btn
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some(coach => coach.id === userId);
    // some return true if condition is met 
  } ,
  shouldUpdate(state){
   const lastFetch = state.lastFetch;
   if(!lastFetch) {
    return true; // if we have no timestamp yet we should update 

   }else { // if we have time stamp
    const currentTimeStamp = new Date().getTime();
    return(currentTimeStamp - lastFetch) / 1000 > 60; 
    // check if el fr2 benhom / 100 as8r mn 60
    // that means its more than a minute ago
    // it will return true lw as8r so it shouldUpdate again (more than minute)
    // return false lw akbr so we shouldn't update again  (less than a minute)

   }
  }
};