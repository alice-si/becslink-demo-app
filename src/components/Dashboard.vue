<template>
  <div class="form-wizard-container">
    <!-- Old violet: color="#9355de" -->
    <form-wizard
      @on-change="onStepChanged"
      @on-complete="onComplete"
      ref="fwizard"
      color="#1cb8c4"
      title=""
      subtitle="" >
      <tab-content title="Initiatives and parties setup"
                    class="tab-content"
                    icon="ti-settings">
        <InitiativesSetup />
      </tab-content>
      <tab-content title="Goals per Service Provider"
                    class="tab-content"
                    icon="ti-view-list-alt">
        <GoalsSetup />
      </tab-content>
      <tab-content title="Students and teachers"
                    class="tab-content"
                    icon="ti-user">
        <StudentsAndTeachersSetup />
      </tab-content>
      <tab-content title="Sponsors and ESGs"
                    class="tab-content"
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
import StudentsAndTeachersSetup from './Students/StudentsAndTeachersSetup'
import SponsorsAndESGsSetup from './ESGs/SponsorsAndESGsSetup'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'


export default {
  data() {
    return {}
  },
  components: {
    FormWizard,
    TabContent,
    InitiativesSetup,
    GoalsSetup,
    StudentsAndTeachersSetup,
    SponsorsAndESGsSetup,
  },
  mounted() {
    if (localStorage.lastStep) {
      console.log(`Local storage contains information about last step: ${localStorage.lastStep}`)
      this.$refs.fwizard.changeTab(this.$refs.activeTabIndex, Number(localStorage.lastStep))
    }
  },
  methods: {
    onComplete() {
      window.toastr.success('Yay. Done!')
    },
    onStepChanged(oldStep, newStep) {
      console.log(`Step switched from ${oldStep} to ${newStep}`)
      if ([0,1,2,3,4].includes(newStep)) {
        localStorage.setItem('lastStep', newStep)
      }
      
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

  .tab-content {
    /* background: black; */
    animation: fade-slide-left 0.4s ease 0s forwards;
  }

  @keyframes fade-slide-left {
    0% {
      /* opacity: 0; */
      transform: translateX(80px);
      /* transform: translateY(80px); */
    }
    100% {
      /* opacity: 1; */
      transform: none;
    }
  }


  /* .form-wizard-container {
    width: 80vw;
    margin: auto;
  } */
</style>
