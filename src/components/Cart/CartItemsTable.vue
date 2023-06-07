<template>
  <table>
    <tr>
      <th>{{ t("product") }}</th>
      <th>{{ t("spec") }}</th>
      <th>{{ t("price") }}</th>
      <th>{{ t("quantity") }}</th>
    </tr>
    <tr v-for="item in cartItems" :key="item.productSepcification">
      <td>
        {{ item.name }}
        <span v-if="item.description">({{ item.description }})</span>
      </td>
      <td>{{ item.selectedFormat1 }}</td>
      <td>${{ item.price }}</td>
      <td class="num">
        <button @click="changeItemAQuantity(item, 'minus')">
          <v-icon icon="mdi-minus-box-outline" class="i" />
        </button>
        <input type="number" :value="item.quantity" disabled />
        <button @click="changeItemAQuantity(item, 'plus')">
          <v-icon icon="mdi-plus-box-outline" class="i" />
        </button>
      </td>
    </tr>
  </table>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
export default {
  props: ["cartItems"],
  setup(props, context) {
    const { t, locale } = useI18n();
    const store = useStore();
    locale.value = store.getters["shop/lang"];

    function changeItemAQuantity(item, action) {
      store.commit("cart/changeItemQuantity", {
        item,
        action,
      });
      store.commit("cart/countTotal");
    }

    return {
      t,
      changeItemAQuantity,
    };
  },
};
</script>

<style scoped lang="scss">
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  text-align: left;
}
th {
  border-bottom: 0.7px solid var(--grey-3);
  height: 50px;
  font-size: var(--f-mi);
}
td {
  height: 50px;
  font-size: var(--f-s);

  &:first-child {
    width: 30%;
    min-width: 7em;
    span {
      margin-left: 1em;
      word-break: break-all;
      display: block;
      color: var(--grey-3);
    }
  }
}

.num {
  display: flex;
  align-items: center;
  input {
    width: 3em;
    text-align: center;
  }

  .i {
    color: var(--orange-1);
    font-size: 1.6rem;
  }
}

div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 4em;
}
p {
  width: 100%;
  text-align: right;
  font-size: var(--f-l);
  font-weight: 500;
}

button {
  color: var(--grey-4);
}

@media screen and (max-width: 500px) {
  th,
  td {
    text-align: center;
    &:first-child {
      text-align: left;
      span {
        margin-left: 0.5em;
      }
    }
  }
  th {
    font-size: var(--f-s);
    white-space: nowrap;
  }
  td {
    height: 60px;
  }

  .num {
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      width: 2em;
      text-align: center;
    }
  }
}
</style>
