<template>
  <div class="initiatives-setup-container">

    <div class="mdl-grid">
      <Initiative
        v-for="initiative in initiatives"
        v-bind:key="initiative.name"
        v-bind:editing="editing[initiative.name]"
        v-bind:data="initiative"
        v-bind:saveInitiative="saveInitiative"
        v-bind:deleteInitiative="deleteInitiative"
        v-bind:startEditing="startEditing"
        />
    </div>

    <span
      v-on:click="addNewInitiative()"
      class="add-new-link">
      + Add initiative
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
import state from '../../state'
import Initiative from './Initiative'

export default {
  data() {
    return {
      state,
      editing: { "" : true },
      addingInitiative: false,
      addingSchool: false,
      addingServiceProvider: false,
    }
  },
  components: {
    Initiative,
  },
  computed: {
    initiatives() {
      let result = Object.values(this.state.initiatives).sort(function(a, b) {
        return a.name.localeCompare(b.name)
      })
      if (this.addingInitiative) {
        result.push({ name: "" })
      }
      return result
    }
  },
  methods: {
    addNewInitiative() {
      this.addingInitiative = true
    },
    saveInitiative(newData, oldData) {
      if (newData.name == "") {
        toastr.warning('Initiative name cannot be empty');
        return;
      }
      if (newData.name != oldData.name && this.state.initiatives[newData.name]) {
        toastr.warning(`Initiative with the name: "${newData.name}" already exists.`
                        + ' Please select another name');
        return;
      }
      this.state.deleteInitiative(oldData.name)
      this.state.upsertInitiative(newData)
      this.addingInitiative = false
      Vue.set(this.editing, newData.name, false)
    },
    startEditing(initiative) {
      Vue.set(this.editing, initiative.name, true)
    },
    deleteInitiative(name) {
      if (confirm(`Are you sure you want to remove the ${name} initiative?`)) {
        this.state.deleteInitiative(name)
      }
    }
  }
}

</script>

<style scoped>
  .add-new-link {
    cursor: pointer
  }

  .add-new-link {
    color: #1cb8c4;
    font-size: 18px;
  }

  .initiatives-setup-container {
    min-height: 50vh;
  }

</style>
