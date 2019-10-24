<template>
  <div class="form-wizard-container">
    <!-- Old violet: color="#9355de" -->
    <form-wizard @on-complete="onComplete"
      color="#1cb8c4"
      title=""
      subtitle="" >
      <tab-content title="Initiatives and parties setup"
                    icon="ti-settings">
        <InitiativesSetup />
      </tab-content>
      <tab-content title="Goals per Service Provider"
                    icon="ti-view-list-alt">
        <GoalsSetup />
      </tab-content>
      <tab-content title="Students and teachers"
                    icon="ti-user">
        <StudentsAndTeachersSetup />
      </tab-content>
      <tab-content title="Sponsors and ESGs"
                    icon="ti-check">
        <SponsorsAndESGsSetup />
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import InitiativesSetup from './Initiatives/InitiativesSetup'
import GoalsSetup from './Goals/GoalsSetup'
import StudentsAndTeachersSetup from './StudentsAndTeachersSetup'
import SponsorsAndESGsSetup from './SponsorsAndESGsSetup'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'


export default {
  components: {
    FormWizard,
    TabContent,
    InitiativesSetup,
    GoalsSetup,
    StudentsAndTeachersSetup,
    SponsorsAndESGsSetup,
  },
  methods: {
    onComplete() {
      alert('Yay. Done!')
    }
  }
}

</script>

<style>
  .stepTitle {
    margin-top: 5px;
  }

  .wizard-tab-content {
    padding-top: 0;
  }

  h4 {
    margin-top: 3px;
  }

  .wizard-footer-left {
    position: absolute;
    top: 230px;
    left: 10vw;
  }

  .wizard-footer-right {
    position: absolute;
    top: 230px;
    right: 15vw;
  }
  /* .form-wizard-container {
    width: 80vw;
    margin: auto;
  } */
</style>
