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
            <label class="mdl-textfield__label" for="sample4">Cost (£)</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
          </div>

          <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input v-model="inputs.upfront" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
            <label class="mdl-textfield__label" for="sample4">Upfront allocation (%)</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
          </div>

          <SchoolsSelector
            v-bind:selected="inputs.schools"
            v-bind:updateSelection="updateSelectedSchools"
            v-bind:addNewSchool="addSchool" />

          <ServiceProviderSelector
            class="service-provider-selector"
            v-bind:selected="inputs.serviceProviders"
            v-bind:updateSelection="updateSelectedServiceProviders"
            v-bind:addNewServiceProvider="addServiceProvider" />
        </form>

        <div v-if="!editing" class="initiative-details">
          <h3>{{ data.name }}</h3>
          <h6>Cost: £{{ data.cost }} | Upfront: {{ data.upfront }}%</h6>
          
        </div>

        <div v-if="!editing" class="additional-details lightgray-bg">
          <h5>Schools</h5>
          <ul>
            <li v-for="school in data.schools" :key="school.name">
              {{ school.name }}
            </li>
          </ul>
        </div>

        <div v-if="!editing" class="additional-details additional-details-bottom">
          <h5>Service providers</h5>
          <ul>
            <li v-for="serviceProvider in data.serviceProviders" :key="serviceProvider.name">
              {{ serviceProvider.name }}
            </li>
          </ul>
        </div>

        <!-- TODO add schools selector -->

        <!-- TODO add serviceProvider selector -->

        <!-- Accent-colored raised button with ripple -->
        <div class="manage-icons">

          <button v-mdl v-on:click="cancelEditing(data)" v-if="editing" 
            class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab">
            <i class="material-icons">close</i>
          </button>

          <button v-mdl v-on:click="saveInitiative(inputs, data)" v-if="editing" 
            class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab">
            <i class="material-icons">done</i>
          </button>

          <button v-on:click="startEditing(data)" v-if="!editing" 
            class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab">
            <i class="material-icons">edit</i>
          </button>

          <button v-on:click="deleteInitiative(data.name)" v-if="!editing"
            class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab">
            <i class="material-icons">delete</i>
          </button>

        </div>

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
        upfront: this.data.upfront,
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
    cancelEditing: Function,
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
    },
  }
}
</script>

<style scoped>

  .mdl-card {
    min-height: 400px;
  }

  .lightgray-bg {
    background: #f8fafd;
  }

  .additional-details {
    min-height: 170px;
  }

  .additional-details-bottom {
    min-height: 220px;
  }

  .additional-details ul {
    list-style-type: none;
    padding: 0;
    /* text-align: left; */
    /* width: 200px; */
    /* margin: auto; */
  }

  .initiative-details {
    background: #1cb8c4;
    min-height: 170px;
    /* background: #9355de; */
  }

  .initiative-details h3 {
    margin-top: 40px;
    color: white;
    /* font-weight: bold; */
  }

  .initiative-details h6 {
    color: white;
  }

  .manage-icons {
    margin-top: 20px;
    position: absolute;
    bottom: 10px;
    right: 20px;
  }

  i.material-icons {
    color: white;
  }

  .mdl-button {
    background: #1cb8c4;
    margin-left: 5px;
  }

  h6 {
    font-size: 14px;
    font-weight: bold;
    color: black;
  }

  form {
    padding: 20px;
    margin-bottom: 50px;
  }

  .service-provider-selector {
    margin-bottom: 30px;
  }
</style>