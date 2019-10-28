<template>
  <form>
    <h3>{{ model.name }}</h3>
    <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input v-model="model.name" class="mdl-textfield__input" type="text" id="name">
      <label class="mdl-textfield__label" for="sample1">Name</label>
    </div>

  </form>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      model: this.inputs,
    }
  },
  props: {
    'inputs': Object,
  },
  watch: {
    model: function(val) {
      this.$emit('changed', val)
    }
  },
  methods: {

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