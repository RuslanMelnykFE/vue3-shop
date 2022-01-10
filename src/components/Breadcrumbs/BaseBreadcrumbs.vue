<template>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
          Каталог
        </router-link>
      </li>
      <li v-for="breadcrumb in breadcrumbsList" :key="breadcrumb.name" class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" :to="{ name: breadcrumb.name }">
          {{ breadcrumb.text }}
        </router-link>
      </li>
      <li v-if="lastBreadcramb" class="breadcrumbs__item">
        <a class="breadcrumbs__link">
          {{ lastBreadcramb }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BaseBreadcrumbs',

  props: {
    breadcrumbsList: {
      type: Array,
      default: () => [],
    },
    lastBreadcramb: {
      type: String,
      default: '',
    },
  },
};
</script>
