<template>
  <div class="multiselect-wrapper">
    <Multiselect
      v-model="value"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      selectLabel=""
      placeholder="Pick some"
      label="name" track-by="name"
      :preselect-first="false" />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import state from '../../state'

const addNewText = '+ Add new';

export default {
  props: {
    selected: Array,
    collection: String,
    addNew: Function,
    updateSelection: Function,
  },
  components: {
    Multiselect
  },
  data() {
    return {
      state,
      value: this.selected,
    }
  },
  computed: {
    options() {
      let res = Object.keys(this.state[this.collection])
      res.push({ name: 'test' })
      res.push({ name: addNewText })
      return res
    }
  },
  watch: {
    value: function(newVal) {
      if (newVal.find(el => el.name == addNewText)) {
        this.value = this.value.filter(el => el.name !== addNewText)
      }
      this.addNew()
      this.updateSelection(this.value)
    }
  },

}
</script>

<style scoped>
.multiselect-wrapper {
  width: 80%;
  margin: auto;
}
</style>