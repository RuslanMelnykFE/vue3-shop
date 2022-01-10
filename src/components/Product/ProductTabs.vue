<template>
  <div class="item__desc">
    <ul class="tabs">
      <li class="tabs__item" v-for="tab in tabsList" :key="tab.name">
        <a
          class="tabs__link"
          :class="{ 'tabs__link--current': selectedTab === tab.name }"
          href="#"
          @click.stop.prevent="doToggleTab(tab.name)"
        >
          {{ tab.text }}
        </a>
      </li>
    </ul>

    <div v-if="selectedTab === 'content'" class="item__content" v-html="content"></div>

    <div v-if="selectedTab === 'specifications'" class="item__content">
      <template v-for="specification in specifications" :key="`specification-${specification.id}`">
        <h3>{{ specification.title }}</h3>
        <p>{{ specification.value }}</p>
      </template>
    </div>

    <div v-if="selectedTab === 'guarantee'" class="item__content">Гарантия</div>
    <div v-if="selectedTab === 'payment'" class="item__content">Оплата и доставка</div>
  </div>
</template>

<script>
import { ref, toRefs, computed } from 'vue';

export default {
  name: 'ProductTabs',

  props: {
    productData: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const tabsList = [
      {
        name: 'content',
        text: 'Описание',
      },
      {
        name: 'specifications',
        text: 'Характеристики',
      },
      {
        name: 'guarantee',
        text: 'Гарантия',
      },
      {
        name: 'payment',
        text: 'Оплата и доставка',
      },
    ];
    const { productData } = toRefs(props);
    const selectedTab = ref('content');

    const content = computed(() => productData.value?.content || 'Описание');
    const specifications = computed(() => productData.value?.specifications || []);

    const doToggleTab = (tab) => {
      selectedTab.value = tab;
    };

    return {
      selectedTab,
      tabsList,
      content,
      specifications,

      doToggleTab,
    };
  },
};
</script>
