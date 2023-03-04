export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) { // to check if no data 
    return state.coaches && state.coaches.length > 0;
  }
};