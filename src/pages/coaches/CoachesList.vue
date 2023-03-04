<template>
<div>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <!-- coach data can't be access by vuex because its local (using for loop)
    so u should use props to pass it from coachList to CoachItem -->
    <ul v-if="hasCoaches">
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
  </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
export default {
  components: {
    CoachItem,
  },
  computed: {
    
    filteredCoaches() {
      return this.$store.getters['coaches/coaches'];
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];// access through named space(coaches)
    }
  }
}
</script>

<style scoped>

ul {
  
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* justify-items: center; */
  list-style: none;
  margin: 1rem auto ;
  padding: 0;
  width: 30rem;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>