<template>
  <button type="button" :disabled="isLoading" @click="checkout">
    {{ t("checkout") }}
  </button>
</template>

<script>
import { useI18n } from "vue-i18n";
export default {
  emits: ["checkout"],
  props: ["isLoading"],
  setup(props, { emit }) {
    const { t } = useI18n();

    function checkout() {
      emit("checkout");
    }

    return {
      checkout,
      t,
    };
  },
};
</script>

<style scoped lang="scss">
button {
  background-color: var(--orange-2);
  font-size: var(--f-mi);
  border-radius: 20px;
  padding: 0.3em 1em;
  color: var(--grey-5);

  &:hover,
  &:active {
    color: var(--grey-1);
    background-color: var(--orange-1);
  }
}
</style>
