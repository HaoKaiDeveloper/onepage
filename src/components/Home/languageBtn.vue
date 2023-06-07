<template>
  <button
    @click="setActiveLanguage(lang)"
    :class="{ active: activeLanguage === lang }"
  >
    {{ btnText }}
  </button>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["lang"],
  setup(props) {
    const store = useStore();
    const activeLanguage = computed(() => {
      return store.getters["shop/lang"];
    });
    const btnText = computed(() => {
      switch (props.lang) {
        case "tw":
          return "中文";
        case "en":
          return "English";
        case "japan":
          return "日本語";
        case "korean":
          return "한국인";
      }
    });
    function setActiveLanguage(lang) {
      store.commit("shop/setlanguage", { lang });
    }
    return {
      btnText,
      activeLanguage,
      setActiveLanguage,
    };
  },
};
</script>

<style scoped lang="scss">
button {
  background-color: var(--grey-2);
  font-size: var(--f-s);
  padding: 0.2em 1em;
  border-radius: 20px;

  &.active {
    background-color: var(--orange-2);
  }
}
</style>
