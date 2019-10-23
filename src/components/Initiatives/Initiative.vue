<template>
  <div class="md-layout-item md-size-50 initiative">

    <!-- <span class="mdc-card initiative-card"> -->
      
    <div class="mdl-cell mdl-cell--12-col">
      <div class="mdl-card mdl-shadow--2dp">
        <form v-if="editing" action="#">
          <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input v-model="inputs.name" class="mdl-textfield__input" type="text" id="name">
            <label class="mdl-textfield__label" for="sample1">Name</label>
          </div>
          
          <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input v-model="inputs.cost" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
            <label class="mdl-textfield__label" for="sample4">Cost ($)</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
          </div>

          <SchoolsSelector
            v-bind:selected="inputs.schools"
            v-bind:updateSelection="updateSelectedSchools"
            v-bind:addNewSchool="addSchool" />

          <ServiceProviderSelector
            v-bind:selected="inputs.serviceProviders"
            v-bind:updateSelection="updateSelectedServiceProviders"
            v-bind:addNewServiceProvider="addServiceProvider" />
        </form>

        <div v-if="!editing" class="details">
          <h4>{{ data.name }}</h4>
          <h6>Cost: £{{ data.cost }}</h6>
        </div>

        <!-- TODO add schools selector -->

        <!-- TODO add serviceProvider selector -->

        <!-- Accent-colored raised button with ripple -->
        <div class="manage-icons">
          <span v-on:click="saveInitiative(inputs, data)"
            v-if="editing"
            class="manage-icon" >
            <i class="material-icons">save</i>
          </span>

          <span v-on:click="startEditing(data)"
            v-if="!editing" 
            class="manage-icon" >
            <i class="material-icons">edit</i>
          </span>

          <span v-on:click="deleteInitiative(data.name)" v-if="!editing"
            class="manage-icon">
            <i class="material-icons">delete</i>
          </span>
        </div>

        <!-- <div v-if="!editing">
          Name: {{ data.name }}
          Cost: {{ data.cost }}
        </div> -->
      </div>
    </div>
      
  </div>
</template>

<script>
import SchoolsSelector from './SchoolsSelector'
import ServiceProviderSelector from './ServiceProviderSelector'

export default {
  components: {
    SchoolsSelector,
    ServiceProviderSelector,
  },
  data() {
    return {
      inputs: {
        name: this.data.name,
        cost: this.data.cost,
        schools: this.data.schools,
        serviceProviders: this.data.serviceProviders,
      },
    }
  },
  props: {
    editing: Boolean,
    data: Object,
    saveInitiative: Function,
    startEditing: Function,
    deleteInitiative: Function,
    addSchool: Function,
    addServiceProvider: Function,
  },
  methods: {
    updateSelectedSchools(schools) {
      this.inputs.schools = schools
    },
    updateSelectedServiceProviders(serviceProviders) {
      this.inputs.serviceProviders = serviceProviders
    }
  }
}
</script>

<style scoped>

  .manage-icons {
    margin-top: 20px;
  }

  .manage-icon {
    color: #1cb8c4;
  }

  .manage-icon :hover {
    opacity: 0.5;
    cursor: pointer;
  }

  h6 {
    font-size: 14px;
    font-weight: bold;
    color: black;
  }
</style>