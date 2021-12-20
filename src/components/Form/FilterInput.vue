<template>
  <label class="form__label form__label--price">
    <input
      class="form__input"
      :type="inputType"
      :name="inputName"
      :value="modelValue"
      @input.prevent="doEventHandler($event.target.value)"
    />
    <span class="form__value">{{ inputLabel }}</span>
  </label>
</template>

<script>
import { ref } from 'vue';

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

  setup(props, { emit: $emit }) {
    const timeDelay = 300;
    const timerId = ref(null);

    const doEventHandler = (inputValue) => {
      clearTimeout(timerId.value);
      timerId.value = setTimeout(() => $emit('update:modelValue', inputValue), timeDelay);
    };

    return {
      doEventHandler,
    };
  },
};
</script>
