<template>
  <div class="sponsors-and-esgs-setup-container">
    <h4>
      Set up ESGs
    </h4>

    <div
      v-on:click="addNewESG()"
      class="add-new-link">
      + Add new ESG
    </div>

    <div class="mdl-grid">
      <ESG
        v-for="esgName in esgs"
        v-bind:key="esgName"
        v-bind:isNew="false"
        v-bind:name="esgName"
        />

      <ESG
        v-if="addingNewESG"
        v-bind:name="''"
        v-bind:isNew="true"
        v-bind:cancelAddingNew="cancelAddingNew"
        />
    </div>
  </div>
</template>

<script>
import ESG from './ESG'
import state from '../../state'
import Vue from 'vue'

export default {
  components: {
    ESG
  },
  data() {
    return {
      state,
      addingNewESG: false,
    }
  },
  methods: {
    addNewESG() {
      Vue.set(this, 'addingNewESG', true)
    },
    cancelAddingNew() {
      Vue.set(this, 'addingNewESG', false)
    }
  },
  computed: {
    esgs() {
      return Object.keys(this.state.esgs)
    }
  },
}

</script>

<style scoped>
  .add-new-link {
    cursor: pointer;
    color: #1cb8c4;
    font-size: 18px;
    margin-bottom: 30px;
  }
</style>
