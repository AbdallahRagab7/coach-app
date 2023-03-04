import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';

const store = createStore({
  modules: {
    coaches: coachesModule 
    // coaches (named space) , use it to access getters,actions,mutations of this module by it 
  }
});

export default store;