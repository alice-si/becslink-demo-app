<template>
  <div class="mdc-text-field mdc-text-field--outlined">
    <input class="mdc-text-field__input" id="text-field-hero-input">
    <div class="mdc-notched-outline">
      <div class="mdc-notched-outline__leading"></div>
      <div class="mdc-notched-outline__notch">
        <label for="text-field-hero-input" class="mdc-floating-label">{{ name }}</label>
      </div>
      <div class="mdc-notched-outline__trailing"></div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    // mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'))
    return {}
  },
  props: {
    name: String
  }
}
</script>