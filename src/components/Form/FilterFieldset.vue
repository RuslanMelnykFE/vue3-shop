<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{ legend }}</legend>
    <slot />
  </fieldset>
</template>

<script>
export default {
  name: 'FilterFieldset',

  props: {
    legend: {
      type: String,
      default: '',
    },
  },
};
</script>
