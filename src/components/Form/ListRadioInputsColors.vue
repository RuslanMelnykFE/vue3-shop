<template>
  <ul v-if="colorsList.length" class="colors">
    <li class="colors__item" v-for="colorData in colorsList" :key="colorData.code">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          name="color"
          :value="colorData.code"
          :checked="modelValue === colorData.code"
          @input.prevent="$emit('update:modelValue', $event.target.value)"
        />
        <span class="colors__value" :style="{ backgroundColor: colorData.code }"> </span>
      </label>
    </li>
  </ul>
</template>

<script>
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
};
</script>
