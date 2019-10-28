<template>
  <div class="md-layout-item md-size-50 initiative">
     
    <div class="mdl-cell mdl-cell--12-col">
      <div class="mdl-card mdl-shadow--2dp">
        <ESGForm
          v-if="formDisplayed"
          :inputs="inputs"
          @changed="inputs = $event.target.value" />

        <ESGData
          v-if="!formDisplayed"
          :data="dataToDisplay"
          />

        <!-- {{ inputs }} -->
        <div class="manage-icons">
          <button v-on:click="onCloseButtonClick()" v-if="formDisplayed" 
            class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab">
            <i class="material-icons">close</i>
          </button>
          <button v-on:click="onDoneButtonClicked()" v-if="formDisplayed" 
            class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab">
            <i class="material-icons">done</i>
          </button>

          <button v-on:click="onEditButtonClick()" v-if="!formDisplayed" 
            class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab">
            <i class="material-icons">edit</i>
          </button>
          <button v-on:click="onDeleteButtonClicked()" v-if="!formDisplayed" 
            class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab">
            <i class="material-icons">delete</i>
          </button>
        </div>

      </div>
    </div>
      
  </div>
</template>

<script>
import ESGForm from './ESGForm'
import ESGData from './ESGData'
import state from '../../state'
import Vue from 'vue'

export default {
  components: {
    ESGForm,
    ESGData,
  },
  data() {
    let inputs = {
      name: ''
    }
    let dataToDisplay = {}
    if (state.esgs[this.name]) {
      inputs = Object.assign({}, state.esgs[this.name])
      dataToDisplay = Object.assign({}, state.esgs[this.name])
    }

    return {
      state,
      inputs,
      dataToDisplay,
      editing: false,
    }
  },
  props: {
    name: String,
    isNew: Boolean,
    cancelAddingNew: Function,
  },
  computed: {
    formDisplayed() {
      return this.editing || !this.name
    }
  },
  methods: {
    onEditButtonClick() {
      Vue.set(this, 'editing', true)
    },
    onCloseButtonClick() {
      Vue.set(this, 'editing', false)
      this.inputs = Object.assign({}, state.esgs[this.name])
      if (this.isNew) {
        this.cancelAddingNew()
      }
    },
    onDeleteButtonClicked() {
      if (confirm('Do you want to delete this ESG: ' + this.name))
      this.state.deleteESG(this.name)
    },
    onDoneButtonClicked() {
      if (!this.inputs.name) {
        window.toastr.warning(`Name can not be empty`)
        return
      }
      
      if (this.name !== this.inputs.name) {
        if (this.state.esgs[this.inputs.name]) {
          window.toastr.warning(`Please use another name. "${this.inputs.name}" is already used`)
          return
        }

        if (this.state.esgs[this.name]) {
          this.state.deleteESG(this.name)
        }
      }

      this.state.upsertESG(Object.assign({}, this.inputs))
      if (this.isNew) {
        this.cancelAddingNew()
      }
      
    }
  }
}
</script>

<style scoped>

 

  h6 {
    font-size: 14px;
    font-weight: bold;
    color: black;
  }

  form {
    padding: 20px;
    margin-bottom: 50px;
  }

  .manage-icons {
    position: absolute;
    right: 5px;
    bottom: 3px;
  }

  .manage-icons button {
    margin: 3px;
  }

</style>