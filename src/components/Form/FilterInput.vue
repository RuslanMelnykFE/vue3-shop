<template>
  <label class="form__label form__label--price">
    <input
      class="form__input"
      :type="inputType"
      :name="inputName"
      :value="modelValue"
      @input.prevent="$emit('update:modelValue', $event.target.value)"
    />
    <span class="form__value">{{ inputLabel }}</span>
  </label>
</template>

<script>
export default {
  name: 'FilterInput',

  props: {
    inputType: {
      type: String,
      default: 'text',
    },
    inputName: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    inputLabel: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],
};
</script>
