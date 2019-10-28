<template>
  <table class="mdl-data-table mdl-js-data-table">
    <thead>
      <tr>
        <th> QR code </th>
        <th> Student ID </th>
        <!-- <th> Name </th> -->
        <th> School </th>
        <th> Age range </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="student in students" :key="student.id">
        <td>
          <!-- <img class="qr-code" src="../../assets/qrcode-example.png" /> -->
          <qrcode-vue :value="student.id" :size="70" level="H"></qrcode-vue>
        </td>
        <td>{{ student.id }}</td>
        <!-- <td>{{ student.name }}</td> -->
        <td>{{ student.school }}</td>
        <td>{{ student.age }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import state from '../../state'
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue
  },
  data() {
    return {
      state
    }
  },
  methods: {
    addStudents() {
      window.toastr.warning('Not implemented yet')
    }
  },

  computed: {
    students() {
      if (!this.state.students) {
        return [];
      }
      return Object.values(this.state.students)
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

img.qr-code {
  width: 50px;
}

td,th {
  width: 18vw;
}

tr th {
  font-size: 14px;
}

</style>
