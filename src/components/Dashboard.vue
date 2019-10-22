<template>
  <div>
    <form-wizard @on-complete="onComplete"
      title=""
      subtitle="" >
      <tab-content title="Personal details"
                    icon="ti-user">
        My first tab content
      </tab-content>
      <tab-content title="Additional Info"
                    icon="ti-settings">
        My second tab content
      </tab-content>
      <tab-content title="Last step"
                    icon="ti-check">
        Yuhuuu! This seems pretty damn simple
      </tab-content>
    </form-wizard@on-complete="onComplete">
  </div>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard'

export default {
  components: {
    FormWizard,
    TabContent
  },
  methods: {
    onComplete() {
      alert('Yay. Done!');
    }
  }
}

</script>

<style scoped>

</style>
