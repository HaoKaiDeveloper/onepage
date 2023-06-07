<template>
  <router-link :to="path" class="cart_btn"
    >{{ btnText }}
    <span v-if="numOfCart > 0 && !homeRoute"> x {{ numOfCart }}</span>
  </router-link>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

export default {
  props: ["homeRoute"],
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const { t } = useI18n();

    store.commit("cart/getItemFromLocalStorage");
    const numOfCart = computed(() => {
      const num = store.getters["cart/cartItems"];
      return num ? num.length : 0;
    });

    const btnText = computed(() => {
      return route.path === "/cart" ? t("continue shopping") : t("cart btn");
    });

    const path = computed(() => {
      return props.homeRoute ? props.homeRoute : "/cart";
    });

    return {
      numOfCart,
      t,
      btnText,
      path,
    };
  },
};
</script>

<style scoped lang="scss">
.cart_btn {
  background-color: var(--orange-1);
  position: fixed;
  bottom: 20px;
  left: 50%;
  z-index: 2;
  transform: translateX(-50%);
  font-size: var(--f-l);
  padding: 0.2em;
  width: 100%;
  max-width: 600px;
  min-width: 200px;
  border-radius: 10px;
  color: var(--grey-1);
  text-align: center;
  text-decoration: none;

  @media screen and (max-width: 500px) {
    max-width: 300px;
  }
}
</style>
