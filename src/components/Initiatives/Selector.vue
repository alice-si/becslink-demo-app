<template>
  <div class="multiselect-wrapper">
    <Multiselect
      v-model="value"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      :searchable="false"
      :deselectLabel="''"
      selectLabel=""
      placeholder="Pick some"
      label="name" track-by="name"
      :preselect-first="false" />

  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import state from '../../state'
import Vue from 'vue'

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
      let res =
        Object.keys(this.state[this.collection])
        .map(el => { return { name: el } })
      res.push({ name: addNewText })
      return res
    }
  },
  watch: {
    value: function(newVal) {
      if (newVal.find(el => el.name == addNewText)) {
        this.value = this.value.filter(el => el.name !== addNewText)
        let selectorComponent = this
        this.state.hacks.onAddingComplete = function(name) {
          let newVal = selectorComponent.value;
          newVal.push({ name })
          Vue.set(selectorComponent, 'value', newVal)
        }
        this.addNew()
      }
      this.updateSelection(this.value)
    }
  },

}
</script>

<style>
.multiselect__option--highlight,.multiselect__tag {
  background: #1cb8c4 !important;

}
</style>