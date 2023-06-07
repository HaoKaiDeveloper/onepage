<template>
  <div>
    <h1 v-if="p[lang]">{{ p[lang] }}</h1>
    <h1 v-else>{{ p.name }}</h1>

    <!-- <h1>{{ product.name["tw"] }}</h1> -->
    <p class="price" v-if="activeSpecificProduct">
      ${{ activeSpecificProduct.price }}
    </p>
    <p class="price" v-else>
      <span>${{ p.productSpecifications[0].price }}</span>
      <span v-if="p.productSpecifications.length > 0">
        ~ ${{ p.productSpecifications.slice(-1)[0].price }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["p", "activeSpecificProduct", "lang"],
};
</script>

<style scoped lang="scss">
h1 {
  font-size: var(--f-xl);
  font-weight: 500;
}

.price {
  font-size: var(--f-xl);
}
</style>
