<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel">
                <!-- <slot></slot> -->
                <div>
                  <h4>Add students</h4>

                    <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label students-number">
                      <input v-model="studentsNumber" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
                      <label class="mdl-textfield__label" for="sample4">Number of students to generate</label>
                      <span class="mdl-textfield__error">Input is not a number!</span>
                    </div>

                    <h6>School</h6>

                    <Multiselect
                      class="select"
                      v-model="selectedSchool"
                      :options="schools"
                      :multiple="false"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :preserve-search="true"
                      :searchable="false"
                      selectLabel=""
                      :deselectLabel="''"
                      placeholder="Pick the school"
                      label="name" track-by="name"
                      :preselect-first="false" />

                    <h6>Age range</h6>

                    <Multiselect
                      class="select"
                      v-model="selectedAge"
                      :options="ageRanges"
                      :multiple="false"
                      :close-on-select="true"
                      :clear-on-select="false"
                      :preserve-search="true"
                      :searchable="false"
                      selectLabel=""
                      :deselectLabel="''"
                      placeholder="Pick the age range"
                      label="name" track-by="name"
                      :preselect-first="false" />

                  <!-- <button @click="add()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored add-students-button">
                    Add students
                  </button> -->

                  <div>
                    <button v-mdl @click="add()"
                      class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab">
                      <i class="material-icons">add</i>
                    </button>                    
                  </div>

                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import state from '../../state'
import Multiselect from 'vue-multiselect'
import { hri } from 'human-readable-ids'

export default {
    components: {
      Multiselect,
    },
    props: {
      isPanelOpen: Boolean,
      onAddPanelClosing: Function
    },
    data: () => ({
      studentsNumber: 3,
      selectedSchool: "",
      selectedAge: "",
      state,
    }),
    computed: {
      schools() {
        return Object.values(this.state.schools);
      },
      ageRanges() {
        return [
          { name: '2005 - 2007'},
          { name: '2008 - 2010'},
          { name: '2010 - 2012'},
        ]
      }
    },
    methods: {
      closeSidebarPanel() {
        this.onAddPanelClosing()
      },
      validateField(val, field) {
        if (!val) {
          let msg = `${field} can not be empty`
          window.toastr.warning(msg)
          throw msg
        }
      },
      generateNewStudent(school, age) {
        return {
          id: hri.random(),
          // name: getRandomName(),
          school,
          age,
        }
      },
      generateNewStudents(number, school, age) {
        let result = [];
        for (let i = 0; i < number; i++) {
          console.log('Generating a new student')
          result.push(this.generateNewStudent(school, age))
        }
        return result
      },
      add() {
        this.validateField(this.studentsNumber, 'Students number')
        this.validateField(this.selectedSchool.name, 'School')
        this.validateField(this.selectedAge.name, 'Age')
        let newStudents = this.generateNewStudents(
          this.studentsNumber,
          this.selectedSchool.name,
          this.selectedAge.name)
        this.state.addStudents(newStudents)
        this.closeSidebarPanel()
      }
    }
}
</script>
<style>
    .slide-enter-active,
    .slide-leave-active
    {
        transition: transform 0.2s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateX(-100%);
        transition: all 150ms ease-in 0s
    }

    .sidebar-backdrop {
        background-color: rgba(0,0,0,.7);
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        cursor: pointer;
        z-index: 2;
    }

    .sidebar-panel {
        overflow-y: auto;
        background-color: white;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        z-index: 999;
        padding: 3rem 20px 2rem 20px;
        width: 400px;
    }

    .add-students-button {
      margin-top: 40px;
    }

    .select {
      /* background: black; */
      max-width: 300px;
      margin: auto;
      margin-bottom: 20px;
    }

    .mdl-button {
      margin-top: 20px;
      background: #1cb8c4;
      /* margin-left: 5px; */
      color: white;
    }

    .students-number {
      width: 250px;
    }

    h4 {
      margin-bottom: 50px;
    }


</style>