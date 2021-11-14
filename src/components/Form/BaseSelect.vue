<template>
  <select class="form__select" :name="selectName" v-model="selectValue">
    <option value="0">{{ defaultOption }}</option>
    <option v-for="option in options" :key="`${selectName}-${option.id}`" :value="option.id">
      {{ option.title }}
    </option>
  </select>
</template>

<script>
import { toRefs, computed } from 'vue';

export default {
  name: 'BaseSelect',

  props: {
    selectName: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultOption: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit: $emit }) {
    const { modelValue } = toRefs(props);
    const selectValue = computed({
      get: () => modelValue.value,
      set: (value) => $emit('update:modelValue', value),
    });

    return {
      selectValue,
    };
  },
};
</script>
