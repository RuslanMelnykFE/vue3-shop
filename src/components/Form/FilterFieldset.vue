<template>
  <fieldset class="form__block">
    <legend class="form__legend">Цена</legend>
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
