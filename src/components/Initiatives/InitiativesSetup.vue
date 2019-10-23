<template>
  <div class="initiatives-setup-container">

    <AddNew
      :postAdd="postAdd"
      :isPanelOpen="isPanelOpen"
      :collection="collectionForAdding"
      :entityTitle="entityTitleForAdding"
      :onAddPanelClosing="onAddPanelClosing"
      />

    <div class="mdl-grid">
      <Initiative
        v-for="initiative in initiatives"
        v-bind:key="initiative.name"
        v-bind:editing="editing[initiative.name]"
        v-bind:data="initiative"
        v-bind:saveInitiative="saveInitiative"
        v-bind:deleteInitiative="deleteInitiative"
        v-bind:startEditing="startEditing"
        v-bind:addSchool="addSchool"
        v-bind:addServiceProvider="addServiceProvider"
        />
    </div>

    <div
      v-on:click="addNewInitiative()"
      class="add-new-link">
      + Add initiative
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import state from '../../state'
import Initiative from './Initiative'
import AddNew from './AddNew'

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
    AddNew,
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
    },
    collectionForAdding() {
      if (this.addingSchool) {
        return 'schools'
      }
      return 'serviceProviders'
    },
    entityTitleForAdding() {
      if (this.addingSchool) {
        return 'school'
      }
      return 'service provider'
    },
    isPanelOpen() {
      return this.addingSchool || this.addingServiceProvider
    }
  },
  methods: {
    addNewInitiative() {
      this.addingInitiative = true
    },
    addSchool() {
      Vue.set(this, 'addingServiceProvider', false)
      Vue.set(this, 'addingSchool', true)
    },
    addServiceProvider() {
      Vue.set(this, 'addingServiceProvider', true)
      Vue.set(this, 'addingSchool', false)
    },
    onAddPanelClosing() {
      Vue.set(this, 'addingServiceProvider', false)
      Vue.set(this, 'addingSchool', false)
    },
    postAdd(collection, data) {
      if (this.state.hacks.onAddingComplete) {
        this.state.hacks.onAddingComplete(data.name)
      }
    },
    saveInitiative(newData, oldData) {
      if (newData.name == "") {
        window.toastr.warning('Initiative name cannot be empty');
        return;
      }
      if (newData.name != oldData.name && this.state.initiatives[newData.name]) {
        window.toastr.warning(`Initiative with the name: "${newData.name}" already exists.`
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
    margin-top: 30px;
  }

  .initiatives-setup-container {
    min-height: 50vh;
  }

</style>
