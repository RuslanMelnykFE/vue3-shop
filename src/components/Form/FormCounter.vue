<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="doDecrement">
      <svg :width="widthIcon" :height="heightIcon" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model="counter" name="count" @input="doAmountInput($event.target.value)" />

    <button type="button" aria-label="Добавить один товар" @click="doIncrement">
      <svg :width="widthIcon" :height="heightIcon" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import { ref, toRefs, watch } from 'vue';

export default {
  name: 'FormCounter',

  props: {
    modelValue: {
      type: [Number, String],
      default: 1,
    },
    modelModifiers: {
      default: () => ({}),
    },
    widthIcon: {
      type: [String, Number],
      default: 12,
    },
    heightIcon: {
      type: [String, Number],
      default: 12,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit: $emit }) {
    const { modelValue } = toRefs(props);
    const counter = ref(1);

    const doAmountInput = (inputValue) => {
      if (!Number(inputValue) || inputValue < 1) {
        counter.value = 1;
        $emit('update:modelValue', 1);
        return;
      }
      $emit('update:modelValue', inputValue);
    };

    const doIncrement = () => {
      $emit('update:modelValue', modelValue.value + 1);
    };
    const doDecrement = () => {
      if (modelValue.value > 1) {
        $emit('update:modelValue', modelValue.value - 1);
      }
    };

    watch(modelValue, (newVal) => {
      counter.value = newVal;
    });

    return {
      counter,
      doAmountInput,
      doIncrement,
      doDecrement,
    };
  },
};
</script>
