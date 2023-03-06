import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';

const store = createStore({
  modules: {
    coaches: coachesModule
  },
  state() {
    return {
      userId: 'c3' // initially new coach will take this id
      // use it to show or hide register button
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});

export default store;