<template>
<div>
  <!-- it will be rendered in body , by using teleport -->
  <!-- if i pass :sow ="error" it will pass string  -->
  <!-- !!error pass boolean ,, !! convert string to boolean  -->
  <!--  we pass true if we have error , false if no have one -->
  <base-dialog :show="!!error" title="An error occured" @close="handleError"> 
  <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                                    <!-- link >>>> link =true -->
        <base-button v-if="!isCoach && isLoading" link to="/register">Register as Coach</base-button>
      </div>
       <!-- coach data can't be access by vuex because its local (using for loop)
      so u should use props to pass it from coachList to CoachItem -->
      <div v-if="isLoading"> 
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      error : null,
      isLoading : false ,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    // return true or false , use it to hide register button
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;// filter (need true or false) false mean delete 
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
     hasCoaches() {
       return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
   async loadCoaches(refresh = false) { // default value
     this.isLoading = true;
     try {
       await this.$store.dispatch('coaches/loadCoaches' , {forceRefresh:refresh });
       // use await , to make isloading = false after execute this dispatch
     } catch (error) {
      this.error = error.message || 'Something went wrong'
    
     }
     this.isLoading = false ; // will be false once a request is done

    } ,
    handleError(){
      this.error = null
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>