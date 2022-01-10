<template>
  <div class="item__pics pics">
    <div class="pics__wrapper">
      <img width="570" height="570" :src="defaultPicture" :alt="altPicture" />
    </div>

    <ul v-if="gallery" class="pics__list">
      <li class="pics__item">
        <a href="" class="pics__link pics__link--current">
          <img
            width="98"
            height="98"
            src="img/phone-square-1.jpg"
            srcset="img/phone-square-1@2x.jpg 2x"
            alt="Название товара"
          />
        </a>
      </li>
      <li class="pics__item">
        <a href="" class="pics__link">
          <img
            width="98"
            height="98"
            src="img/phone-square-2.jpg"
            srcset="img/phone-square-2@2x.jpg 2x"
            alt="Название товара"
          />
        </a>
      </li>
      <li class="pics__item">
        <a href="" class="pics__link">
          <img
            width="98"
            height="98"
            src="img/phone-square-3.jpg"
            srcset="img/phone-square-3@2x.jpg 2x"
            alt="Название товара"
          />
        </a>
      </li>
      <li class="pics__item">
        <a class="pics__link" href="#">
          <img
            width="98"
            height="98"
            src="img/phone-square-4.jpg"
            srcset="img/phone-square-4@2x.jpg 2x"
            alt="Название товара"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProductPictures',

  props: {
    defaultPicture: {
      type: String,
      default: '',
    },
    altPicture: {
      type: String,
      default: '',
    },
    gallery: {
      type: Array,
      default: () => [],
    },
  },

  setup() {},
};
</script>
