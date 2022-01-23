<template>
  <BaseLayout>
    <div class="content__top">
      <BaseBreadcrumbs lastBreadcramb="Корзина" />

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">{{ amountProducts }}</span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <CartList />
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalCostProducts }} у.е.</span>
          </p>

          <router-link class="cart__button button button--primery" :to="{ name: 'orders' }">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </BaseLayout>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { formatedNumber, formatedTextProducts } from '@/services/formatting.service';
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import CartList from '@/components/Cart/CartList.vue';

export default {
  name: 'ViewCart',

  components: {
    BaseLayout,
    CartList,
  },

  setup() {
    const $store = useStore();

    const totalCostProducts = computed(() => {
      const totalCost = $store.getters['basket/totalCostProducts'];
      return formatedNumber(totalCost);
    });

    const amountProducts = computed(() => {
      const amount = $store.getters['basket/amountsProducts'];
      if (!amount) {
        return '';
      }
      const productText = formatedTextProducts(amount);

      return `${formatedNumber(amount)} ${productText}`;
    });

    return {
      totalCostProducts,
      amountProducts,
    };
  },
};
</script>

<style lang="scss">
.cart__button {
  text-align: center;
}
</style>
