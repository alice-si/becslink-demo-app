<template>
  <div>
    <h6>Schools</h6>
    <Selector
      v-bind:selected.sync="selected"
      v-bind:addNew="addNewSchool"
      v-bind:updateSelection="updateSelection"
      collection="schools" />  
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
    addNewSchool: Function,
  }
}
</script>

<style scoped>
</style>