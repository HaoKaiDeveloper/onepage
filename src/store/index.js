import { createStore } from "vuex";
import cartModule from "./cart/cart";
import ShopModule from "./shop/shop";
import orderModule from "./order/order";

const store = createStore({
  modules: {
    cart: cartModule,
    shop: ShopModule,
    order: orderModule,
  },
  state() {
    return {};
  },
  mutations: {},
  getters: {},
  actions: {},
});

export default store;
