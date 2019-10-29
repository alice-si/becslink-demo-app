<template>
  <div class="esg-goals-selector">
    <!-- <input type="text" v-model="goalsModel" value="goals" /> -->    

    <table class="mdl-data-table mdl-js-data-table">
      <thead>
        <tr>
          <th>Goal</th>
          <th>Weight</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="goalName in selectedGoals" :key="goalName">
          <td>
            {{ goalName }}
          </td>
          <td>
            {{ goalsModel[goalName] }}%
          </td>
          <td>
            <span @click="onDeleteButtonClick(goalName)" class="manage-icon">
              <i class="material-icons">delete</i>
            </span>
          </td>
        </tr>

        <tr v-if="addingNewGoal">
          <td class="input-td">
            <Multiselect
              class="select"
              v-model="selectedGoal"
              :options="goalsOptions"
              :multiple="false"
              :close-on-select="true"
              :clear-on-select="false"
              :preserve-search="true"
              :searchable="false"
              selectLabel=""
              :deselectLabel="''"
              placeholder="Pick the goal"
              :preselect-first="false" />
          </td>
          <td class="input-td">
            <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input v-model="selectedWeight" class="mdl-textfield__input" type="text" id="name">
              <label class="mdl-textfield__label" for="sample1">Weight (%)</label>
            </div>
          </td>
          <td>
            <span @click="onCloseButtonClick()" class="manage-icon">
              <i class="material-icons">close</i>
            </span>
            <span @click="onDoneButtonClick()" class="manage-icon">
              <i class="material-icons">done</i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="add-new-link">
      <a @click="startGoalAdding()" >+ Add new goal</a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import state from '../../state'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      goalsModel: Object.assign({}, this.goals),
      state,
      addingNewGoal: false,
      selectedGoal: '',
      selectedWeight: 0,
    }
  },
  props: {
    goals: Object,
  },
  computed: {
    goalsOptions() {
      let resultGoalsObj = {}
      for (let serviceProviderName in this.state.serviceProviders) {
        let serviceProvider = this.state.serviceProviders[serviceProviderName]
        if (serviceProvider.goals) {
          for (let goalId in serviceProvider.goals) {
            let goalName = serviceProvider.goals[goalId].name
            if (!this.goalsModel[goalName]) {
              resultGoalsObj[goalName] = 1
            }
          }
        }
      }
      return Object.keys(resultGoalsObj)
    },

    selectedGoals() {
      return Object.keys(this.goalsModel)
    }
  },
  watch: {
    goalsModel: function(val) {
      console.log("WATCH")
      console.log(val)
      this.$emit('goalsChanged', Object.assign({}, val))
    }
  },
  methods: {
    onDoneButtonClick() {
      if (!this.selectedGoal) {
        window.toastr.warning('Please select the goal name')
        return
      }
      if (!this.selectedWeight) {
        window.toastr.warning('Please set non-zero weight for the selected goal')
        return
      }

      Vue.set(this.goalsModel, this.selectedGoal, this.selectedWeight)
      Vue.set(this, 'addingNewGoal', false)
    },
    onCloseButtonClick() {
      Vue.set(this, 'addingNewGoal', false)
    },
    startGoalAdding() {
      Vue.set(this, 'addingNewGoal', true)
    },
    onDeleteButtonClick(goalName) {
      Vue.delete(this.goalsModel, goalName)
    }
  }
}
</script>

<style scoped>

.mdl-textfield {
  width: 5vw;
}

td.input-td {
  /* width: 5vw; */
  /* padding: 2px; */
}

td,th {
  min-width: 170px;
}

table {
  margin: auto;
  /* margin-bottom: 30px; */
  text-align: center;
}

.select {
  margin-top: 12px;
  /* min-width: 150px; */
  margin: auto;
}

.add-new-link {
  font-size: 14px;
  margin-top: 10px;
  /* padding-bottom: 10px; */
  cursor: pointer;
  margin-bottom: 30px;
}

.add-new-link a {
  color: #1cb8c4;
}

</style>
