<template>
  <tr class="form-row">
    <td>
      <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input v-model="goal.name" class="mdl-textfield__input" type="text" id="name">
        <label class="mdl-textfield__label" for="sample1">Name</label>
      </div>
    </td>
    <td>
      <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input v-model="goal.costPerUnit" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
        <label class="mdl-textfield__label" for="sample4">Cost per unit (£)</label>
        <span class="mdl-textfield__error">Input is not a number!</span>
      </div>
    </td>
    <td>
      <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input v-model="goal.numberOfUnits" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
        <label class="mdl-textfield__label" for="sample4">Number of units</label>
        <span class="mdl-textfield__error">Input is not a number!</span>
      </div>
    </td>
    <td>
      <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input v-model="goal.allocate" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
        <label class="mdl-textfield__label" for="sample4">Allocate (%)</label>
        <span class="mdl-textfield__error">Input is not a number!</span>
      </div>
    </td>
    <td>
      <span @click="onCancelButtonClick()" class="manage-icon">
        <i class="material-icons">cancel</i>
      </span>
      <span @click="onSaveButtonClick()" class="manage-icon">
        <i class="material-icons">save</i>
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    goal: Object,
    onSaveButtonClick: Function,
    onCancelButtonClick: Function,
  }
}
</script>

<style scoped>
.mdl-textfield {
  max-width: 15vw;
}
</style>