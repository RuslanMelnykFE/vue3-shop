<template>
  <ul v-if="colorsList.length" class="colors">
    <li class="colors__item" v-for="colorData in colorsList" :key="colorData.code">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          name="color"
          :value="colorData.code"
          :checked="color === colorData.code"
          v-model="color"
        />
        <span class="colors__value" :style="{ backgroundColor: colorData.code }"> </span>
      </label>
    </li>
  </ul>
</template>

<script>
import { computed, toRefs } from 'vue';

export default {
  name: 'ListRadioInputsColors',

  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    colorsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit: $emit }) {
    const { modelValue } = toRefs(props);

    const color = computed({
      get: () => modelValue.value,
      set: (val) => $emit('update:modelValue', val),
    });

    return { color };
  },
};
</script>
