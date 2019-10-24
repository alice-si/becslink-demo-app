<template>
  <div class="goals-setup-container">
    <!-- <h2>Goals setup</h2> -->
    <GoalsForServiceProvider
      v-for="serviceProvider in serviceProviders"
      :key="serviceProvider"
      :serviceProvider="serviceProvider" />
  </div>
</template>

<script>
import state from '../../state'
import GoalsForServiceProvider from './GoalsForServiceProvider'

export default {
  components: {
    GoalsForServiceProvider,
  },
  data() {
    return {
      state,
    }
  },
  computed: {
    serviceProviders() {
      return Object.keys(this.state.serviceProviders)
    }
  }
}

</script>

<style scoped>
</style>
