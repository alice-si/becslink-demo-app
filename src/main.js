import Vue from 'vue'
import App from './App.vue'
import state from './state'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.directive('mdl', {
  bind: function(el) {
    if (el) {
      window.componentHandler.upgradeElement(el)
    }
  }
})

window.getAppState = function() {
  return state
}
