<template>
  <div id="app">
    <div id="top-bar">
      <div id="logos-panel">
        <div class="logo logo-left">
          <img src="./assets/BECSLink-logo.png" />
        </div>

        <div class="logo logo-right">
          <img src="./assets/alice-si-logo.png" />
        </div>
      </div>
    </div>
    <div class="dashboard-wrapper">
      <Dashboard />
    </div>
  </div>
</template>

<script>
import state from './state'
import Dashboard from './components/Dashboard.vue'

// Calling once on app loading
state.loadStateFromLocalStorage()

export default {
  name: 'app',
  components: {
    Dashboard,
  }
}


</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.logo img {
  height: 50px;
  padding: 10px;
}

.logo-right {
  float: right;
  /* margin-right: 130px; */
}

.logo-left {
  float: left;
}

#logos-panel {
  height: 70px;
  width: 80vw;
  margin: auto;
}

#top-bar {
  background: #f8fafd;
  width: 100vw;
}

.dashboard-wrapper {
  width: 80vw;
  margin: auto;
}

.mdl-button--fab.mdl-button--colored {
  background: #9355de;
}

.mdl-button--fab.mdl-button--colored :hover {
  opacity: 0.5;
}

#toast-container > div {
    opacity: 0.99;
}
</style>
