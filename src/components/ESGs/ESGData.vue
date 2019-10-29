<template>
  <div class="esg-details">
    <div class="esg-top-details">
      <h3>{{ data.name }}</h3>
    </div>

    <div class="esg-goals">
      <table class="mdl-data-table mdl-js-data-table">
        <thead>
          <tr>
            <th>Goal</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="goal in goalList" :key="goal.name">
            <td>
              {{ goal.name }}
            </td>
            <td>
              {{ goal.weight }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {}
  },
  props: {
    data: Object,
  },
  computed: {
    goalList() {
      let result = []
      for (let goalName in this.data.goals) {
        result.push({
          name: goalName,
          weight: this.data.goals[goalName]
        })
      }
      result.sort((el1, el2) => el2.weight - el1.weight )
      return result
    }
  },
  methods: {

  }
}
</script>

<style scoped>

h3 {
  margin: 0;
  padding-top: 30px;
}

.esg-top-details {
  height: 100px;
  color: white;
  background: #1cb8c4;
}

.esg-goals {
  /* min-height: 400px; */
  margin-top: 30px;
  margin-bottom: 100px;
}

.esg-goals table {
  width: 70%;
  margin: auto;
}

th {
  font-size: 14px;
  text-align: center;
}

td {
  text-align: center;
}

</style>