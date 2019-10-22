<template>
  <div class="md-layout-item md-size-50 initiative">

    <!-- <span class="mdc-card initiative-card"> -->
      
    <div class="mdl-cell mdl-cell--12-col">
      <div class="mdl-card mdl-shadow--2dp">
        <form action="#">
          <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input v-model="inputs.name" class="mdl-textfield__input" type="text" id="name">
            <label class="mdl-textfield__label" for="sample1">Name</label>
          </div>
          
          <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input v-model="inputs.cost" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
            <label class="mdl-textfield__label" for="sample4">Cost ($)</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
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

        </form>

        <!-- <div v-if="!editing">
          Name: {{ data.name }}
          Cost: {{ data.cost }}
        </div> -->
      </div>
    </div>
      
    <!-- </div> -->
  </div>
</template>

<script>
import MdInput from '../MdInput'

export default {
  components: {
    MdInput
  },
  data() {
    return {
      inputs: {
        name: this.data.name,
        cost: this.data.cost
      },
    }
  },
  props: {
    editing: Boolean,
    data: Object,
    saveInitiative: Function,
    startEditing: Function,
    deleteInitiative: Function,
  }
}
</script>

<style scoped>
  /* .initiative-card {
    height: 200px;
  } */
  .initiative {
    /* border: 1px solid black; */
  }

  .mdl-text-field {
    /* margin: 50px; */
  }

  .manage-icons {
    margin-top: 20px;
  }

  .manage-icon {
    color: #1cb8c4;
  }

  .manage-icon :hover {
    opacity: 0.5;
  }
</style>