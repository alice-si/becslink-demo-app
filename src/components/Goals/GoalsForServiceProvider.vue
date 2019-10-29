<template>
  <div>
    <h5>Goals for {{ serviceProvider }}</h5>

    <table class="mdl-data-table mdl-js-data-table">
      <!-- <thead  v-bind:class="{ darkened: (goalOnEditName || addingNewGoal) }"> -->
      <thead>
      <tr>
        <th> Goal </th>
        <th> Cost per unit </th>
        <th> Number of units </th>
        <th> Total cost </th>
        <th> Allocate </th>
        <th> Actions </th>  
      </tr>
      </thead>


      <tbody>
        <tr v-for="goal in goals" :class="{ hidden: goal.name == goalOnEditName }" :key="goal.createdAt">
          <!-- <tbody v-if="!addingNewGoal && !goalOnEditName != goal.name"> -->
            <td v-if="goalOnEditName != goal.name">
              {{ goal.name }}
            </td>
            <td v-if="goalOnEditName != goal.name">
              £{{ goal.costPerUnit }}
            </td>
            <td v-if="goalOnEditName != goal.name">
              {{ goal.numberOfUnits }} </td>
            <td v-if="goalOnEditName != goal.name">
              £{{ goal.costPerUnit * goal.numberOfUnits }} </td>
            <td v-if="goalOnEditName != goal.name">
                {{ goal.allocate }}%
                (£{{ goal.allocate * (goal.costPerUnit * goal.numberOfUnits) / 100 }})
            </td>
            <td v-if="goalOnEditName != goal.name">
              <span @click="startGoalEdition(goal)" class="manage-icon">
                <i class="material-icons">edit</i>
              </span>
              <span @click="deleteGoal(goal)" class="manage-icon">
                <i class="material-icons">delete</i>
              </span>
            </td>
          <!-- </tbody> -->

        </tr>

        <!-- <GoalFormRow
          class="form-row"
          v-if="goalOnEditName"
          :onSaveButtonClick="saveGoal"
          :onCancelButtonClick="onCancelButtonClick"
          :goal="goalOnEditData" /> -->

        <GoalFormRow
          class="form-row"
          v-if="addingNewGoal || goalOnEditName"
          :onSaveButtonClick="saveGoal"
          :onCancelButtonClick="onCancelButtonClick"
          :goal="goalOnEditData" />  
        
      </tbody>
    </table>

    <div @click="startNewGoalEditing()" class="add-new-link">
      + Add new goal for {{ serviceProvider }}
    </div>

    <!-- <hr /> -->
  </div>
</template>

<script>
import Vue from 'vue'
import state from '../../state'
import GoalFormRow from './GoalFormRow'

export default {
  components: {
    GoalFormRow,
  },
  data() {
    return {
      state,
      addingNewGoal: false,
      goalOnEditName: "",
      goalOnEditData: {},
    }
  },
  props: {
    serviceProvider: String,
  },
  methods: {
    startNewGoalEditing() {
      Vue.set(this, 'goalOnEditName', "")
      Vue.set(this, 'addingNewGoal', true)
    },
    startGoalEdition(goal) {
      Vue.set(this, 'goalOnEditName', goal.name)
      Vue.set(this, 'addingNewGoal', false)
      Vue.set(this, 'goalOnEditData', goal)
    },
    validateGoalData() {
      let field

      if (!this.goalOnEditData.allocate) {
        field = 'Allocate'
      }
      if (!this.goalOnEditData.numberOfUnits) {
        field = 'Number of units'
      }
      if (!this.goalOnEditData.costPerUnit) {
        field = 'Cost per unit'
      }
      if (!this.goalOnEditData.name) {
        field = 'Name'
      }
      if (field) {
        let msg = `"${field}" is required`
        window.toastr.warning(msg)
        throw new Error(msg)
      }
    },
    deleteGoal(goal) {
      if (confirm(`Are you sure you want to delete "${goal.name}" goal?`)) {
        this.state.deleteServiceProviderGoal(this.serviceProvider, goal)
      }
    },
    // TODO handle both cases - adding new and modifying the old one
    saveGoal() {
      this.validateGoalData()

      let newGoal = Object.assign({}, this.goalOnEditData)
      if (!newGoal.createdAt) {
        newGoal.createdAt = Date.now()
      }
      this.state.updateServiceProviderGoal(
        this.serviceProvider,
        newGoal)
      this.goalOnEditData = {}
      Vue.set(this, 'goalOnEditName', "")
      Vue.set(this, 'addingNewGoal', false)
    },
    onCancelButtonClick() {
      Vue.set(this, 'goalOnEditName', "")
      Vue.set(this, 'addingNewGoal', false)
    },
  },
  computed: {
    goals() {
      let result = this.state.serviceProviders[this.serviceProvider].goals
      if (!result) {
        return []
      }
      return Object.values(result)
    }
  }
}
</script>

<style scoped>
.add-new-link {
  color: #1cb8c4;
  font-size: 14px;
  margin-top: 20px;
  cursor: pointer;
  /* margin-bottom: 100px; */
}

.mdl-textfield {
  /* padding-right: 30px; */
  /* padding-left: 30px; */
}


td,th {
  width: 15vw;
}

tr th {
  font-size: 14px;
}

.darkened {
  opacity: 0.5;
}

.hidden {
  display: none;
}

h5 {
  margin-top: 80px;
}

</style>