<template>
  <div class="students-and-teachers-setup-container">
    <AddStudentsPanel
      :isPanelOpen="isPanelOpen"
      :onAddPanelClosing="onAddPanelClosing" />

    <h4>Create IDs for Students</h4>
    <div
      v-on:click="openAddPanel()"
      class="add-new-link">
      + Add students
    </div>
    <div @click="deleteStudents()" class="delete-students-button-container">
      <i class="material-icons">delete</i>
    </div>

    <StudentsList />
  </div>
</template>

<script>
import state from '../../state'
import StudentsList from './StudentsList'
import AddStudentsPanel from './AddStudentsPanel'

export default {
  components: {
    StudentsList,
    AddStudentsPanel,
  },
  data() { return {
      isPanelOpen: false,
      state
    }
  },
  methods: {
    onAddPanelClosing() {
      this.isPanelOpen = false
    },
    openAddPanel() {
      this.isPanelOpen = true
    },
    deleteStudents() {
      if (confirm('Do you want to delete all the students data?')) {
        this.state.deleteAllStudents()
      }
    }
  }
}

</script>

<style scoped>

.add-new-link {
  color: #1cb8c4;
  font-size: 18px;
  margin-bottom: 30px;
  cursor: pointer;
}

.delete-students-button-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
}

.delete-students-button-container i {
  font-size: 20px;
}

</style>
