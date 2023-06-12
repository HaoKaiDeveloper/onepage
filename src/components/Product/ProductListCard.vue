<template>
  <div class="product_card">
    <div class="img">
      <router-link :to="`/product/${p.productId}`">
        <ImgsSwiper :imgs="p.imgList" v-if="p.imgList.length > 0" />
      </router-link>
    </div>
    <div>
      <h1 v-if="p[productLang]">{{ p[productLang] }}</h1>
      <h1 v-else>{{ p["name"] }}</h1>
      <p>
        <span>${{ p.productSpecifications[0].price }}</span>
        <span v-if="p.productSpecifications.length > 0">
          ~ ${{ p.productSpecifications.slice(-1)[0].price }}
        </span>
      </p>
      <router-link class="plus_btn" :to="`/product/${p.productId}`">
        <v-icon icon="mdi-cart-outline" />
      </router-link>
    </div>
  </div>
</template>

<script>
import ImgsSwiper from "./ImgsSwiper.vue";
import { computed } from "vue";
export default {
  props: ["p", "lang"],
  components: { ImgsSwiper },
  setup(props, context) {
    const productLang = computed(() => {
      switch (props.lang) {
        case "tw":
          return "name";
        case "en":
          return "englishName";
        case "japan":
          return "japaneseName";
        case "korean":
          return "koreanName";
      }
    });

    return { productLang };
  },
};
</script>

<style scoped lang="scss">
.product_card {
  width: 100%;
  // max-width: 50em;
  min-width: 40em;
  max-height: 20em;
  min-height: 10em;
  display: flex;
  justify-content: space-between;
  position: relative;
  gap: 2em;
  .img {
    width: 25em;
    height: 100%;
  }
  h1 {
    font-size: var(--f-mi);
    font-weight: 500;
    max-width: 150px;
    word-break: break-word;
  }
  p {
    font-size: var(--f-s);
    text-align: left;
  }
  .plus_btn {
    position: absolute;
    right: 1em;
    bottom: 0;
    background-color: var(--orange-1);
    font-size: 15px;
    padding: 0.4em;
    border-radius: 50%;
    color: var(--grey-1);
    text-decoration: none;
    z-index: 2;
  }

  @media screen and (max-width: 500px) {
    min-width: 100%;
    gap: 0.2em;
    align-items: center;
    .img {
      width: 30%;
      min-width: 11.5em;
      height: 100%;
      order: 1;
    }
    .plus_btn {
      right: 0.5em;
      bottom: 0.5em;
    }
    div {
      flex: 1;
    }
    h1{
      font-size: 16px;
      font-weight: 600;
      margin-bottom: .5em;
    }
    h1,
    p {
      text-align: left;
    }
  }
}
</style>
