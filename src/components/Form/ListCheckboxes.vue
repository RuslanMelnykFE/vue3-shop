<template>
  <ul v-if="checkboxesList" class="check-list">
    <li class="check-list__item" v-for="checkboxData in checkboxesList" :key="checkboxData.id">
      <label class="check-list__label">
        <input
          class="check-list__check sr-only"
          type="checkbox"
          :name="`${checkboxName}[]`"
          :value="checkboxData.value"
          @input.prevent="$emit('changeCheckboxValues')"
        />
        <span class="check-list__desc">
          {{ checkboxData.value }}
          <span v-if="checkboxData.productsCount">({{ checkboxData.productsCount }})</span>
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ListCheckboxes',

  props: {
    modelValue: {
      type: [Array, Object],
      default() {
        return {};
      },
    },
    checkboxName: {
      type: String,
      required: true,
    },
    checkboxesList: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  emits: ['changeCheckboxValues'],
};
</script>
