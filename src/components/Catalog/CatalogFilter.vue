<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get">
      <FilterFieldset legend="Цена">
        <FilterInput input-name="min-price" input-label="От" v-model.number="priceFrom" />
        <FilterInput input-name="min-price" input-label="До" v-model.number="priceTo" />
      </FilterFieldset>

      <FilterFieldset legend="Категория">
        <label class="form__label form__label--select">
          <BaseSelect
            select-name="category"
            default-option="Все категории"
            :options="options"
            v-model.number="categoryId"
          />
        </label>
      </FilterFieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#73B6EA"
                checked=""
              />
              <span class="colors__value" style="background-color: #73B6EA;"> </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="#FFBE15" />
              <span class="colors__value" style="background-color: #FFBE15;"> </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="#939393"/>
              <span class="colors__value" style="background-color: #939393;"> </span
            ></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="#8BE000"/>
              <span class="colors__value" style="background-color: #8BE000;"> </span
            ></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="#FF6B00"/>
              <span class="colors__value" style="background-color: #FF6B00;"> </span
            ></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="#FFF"/>
              <span class="colors__value" style="background-color: #FFF;"> </span
            ></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" value="#000"/>
              <span class="colors__value" style="background-color: #000;"> </span
            ></label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>

        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="8"
                checked=""
              />
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16" />
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32" />
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64" />
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="128" />
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="264" />
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { ref } from 'vue';
import FilterFieldset from '@/components/Form/FilterFieldset.vue';
import FilterInput from '@/components/Form/FilterInput.vue';
import BaseSelect from '@/components/Form/BaseSelect.vue';

const categories = [
  {
    id: 1,
    title: 'Смартфоны',
    slug: 'smartfony',
  },
  {
    id: 2,
    title: 'Ноутбуки',
    slug: 'noutbuki',
  },
  {
    id: 3,
    title: 'Наушники',
    slug: 'naushniki',
  },
  {
    id: 4,
    title: 'Самокаты',
    slug: 'samokaty',
  },
  {
    id: 5,
    title: 'Велосипеды',
    slug: 'velosipedy',
  },
  {
    id: 8,
    title: 'Гаджеты',
    slug: 'gadzhety',
  },
  {
    id: 9,
    title: 'Аудио',
    slug: 'audio',
  },
  {
    id: 10,
    title: 'Скутеры и скейты',
    slug: 'skutery-i-skeyty',
  },
  {
    id: 11,
    title: 'Дроны',
    slug: 'drony',
  },
];

export default {
  name: 'CatalogFilter',

  components: {
    FilterFieldset,
    FilterInput,
    BaseSelect,
  },

  setup() {
    const priceFrom = ref(0);
    const priceTo = ref(0);
    const options = categories;
    const categoryId = ref(0);

    return {
      priceFrom,
      priceTo,
      options,
      categoryId,
    };
  },
};
</script>
