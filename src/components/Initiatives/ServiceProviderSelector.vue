<template>
  <div>
    <h6>Service providers</h6>
    <Selector
      v-bind:selected="selected"
      v-bind:updateSelection="updateSelection"
      v-bind:addNew="addNewServiceProvider"
      collection="serviceProviders" />
  </div>
</template>

<script>
import Selector from './Selector'

export default {
  components: {
    Selector,
  },
  props: {
    selected: Array,
    updateSelection: Function,
    addNewServiceProvider: Function,
  }
}
</script>

<style scoped>
</style>