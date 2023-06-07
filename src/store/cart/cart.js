export default {
  namespaced: true,
  state() {
    return {
      cartItems: [],
      cartTotal: 0,
    };
  },
  getters: {
    cartItems(state) {
      return state.cartItems;
    },
    cartTotal(state) {
      return state.cartTotal;
    },
  },
  mutations: {
    getItemFromLocalStorage(state, payload) {
      let items = localStorage.getItem("shopCart");
      if (items) {
        items = JSON.parse(items);
        state.cartItems = items;
      }
    },
    addItem(state, payload) {
      const { p, product, quantity, description } = payload;
      const item = {
        description,
        name: product.name,
        maximum: product.maximum,
        price: p.price,
        productSpecificationId: p.id,
        selectedFormat1: p.name,
        quantity,
      };
      let localCart = localStorage.getItem("shopCart");
      if (localCart) {
        localCart = JSON.parse(localCart);
        const sameItemIndex = localCart.findIndex(
          (i) => i.productSpecificationId === item.productSpecificationId
        );
        if (sameItemIndex >= 0) {
          let localItem = localCart[sameItemIndex];
          localItem.quantity += item.quantity;
          if (description) {
            localItem.description = item.description;
          }
          if (localItem.quantity >= item.maximum) {
            localItem.quantity = item.maximum;
          }

          localStorage.setItem("shopCart", JSON.stringify(localCart));
          state.cartItems = [...localCart];
          console.log(state.cartItems);
        } else {
          localStorage.setItem(
            "shopCart",
            JSON.stringify([item, ...localCart])
          );
          state.cartItems = [item, ...localCart];
        }
      } else {
        localStorage.setItem("shopCart", JSON.stringify([item]));
        state.cartItems = [item];
      }
    },
    changeItemQuantity(state, payload) {
      const { item, action } = payload;
      const localCart = JSON.parse(localStorage.getItem("shopCart"));
      const itemIndex = localCart.findIndex(
        (cartItem) =>
          cartItem.productSpecificationId === item.productSpecificationId
      );

      if (action === "minus") {
        localCart[itemIndex].quantity--;
        if (localCart[itemIndex].quantity <= 0) {
          localCart.splice(itemIndex, 1);
        }
      } else {
        localCart[itemIndex].quantity++;
        if (localCart[itemIndex].quantity >= item.maximum) {
          localCart[itemIndex].quantity = item.maximum;
        }
      }

      localStorage.setItem("shopCart", JSON.stringify(localCart));
      state.cartItems = [...localCart];
    },

    countTotal(state) {
      let localCart = localStorage.getItem("shopCart");
      if (localCart) {
        localCart = JSON.parse(localCart);
        let num = 0;
        localCart.forEach((i, index) => {
          num += Number(i.price) * Number(i.quantity);
        });
        state.cartTotal = num;
      }
    },
  },
  actions: {},
};
