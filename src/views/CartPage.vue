<template>
  <section>
    <div class="cart_list">
      <h1>
        {{ t("Review your bag") }}
      </h1>
      <CartItemsTable :cartItems="cartItems" />
      <div>
        <p v-if="cartTotal > 0">{{ t("total") }} ${{ cartTotal }}</p>
      </div>
    </div>

    <StatementInput
      :userInfo="user.userInfo"
      @signed-statement="signedStatement"
      @statement-popup="toggleStatement"
    />

    <div class="order_info">
      <h1>{{ t("order information") }}</h1>
      <UserInfoForm :userInfo="user.userInfo" />
    </div>

    <div class="develivery_info" v-if="deliveryState">
      <h1>{{ t("recipient information") }}</h1>
      <RecipientInfoForm :userInfo="user.recipientInfo" />
    </div>

    <div class="checkOut_btn" v-if="cartItems.length > 0">
      <p v-if="checkOutErrorMsg.length > 0">{{ t(checkOutErrorMsg) }}</p>
      <CheckoutBtn @checkout="checkOut" :isLoading="isLoading" />
    </div>

    <StatementPopup v-if="statementPopup" @close-statement="toggleStatement" />

    <QrPopup
      v-show="checkoutUrl"
      :checkoutUrl="checkoutUrl"
      @close-popup="colseQrPopup"
    />
    <CartBtn :homeRoute="`/home?acc=${storeInfo.token}`" />
  </section>
</template>

<script>
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import { useI18n } from "vue-i18n";
import { UAParser } from "ua-parser-js";
import {
  CartBtn,
  QrPopup,
  RecipientInfoForm,
  UserInfoForm,
  CartItemsTable,
  StatementInput,
  CheckoutBtn,
} from "../components/Cart/index";
import StatementPopup from "../components/StatementPopup.vue";
export default {
  components: {
    UserInfoForm,
    RecipientInfoForm,
    StatementPopup,
    QrPopup,
    CartBtn,
    CartItemsTable,
    StatementInput,
    CheckoutBtn,
  },
  setup() {
    const store = useStore();
    const { t, locale } = useI18n();
    const uaparser = new UAParser();
    const statementPopup = ref(false);
    const checkoutUrl = ref("");
    const isLoading = ref(false);

    locale.value = JSON.parse(localStorage.getItem("language")) || "tw";
    store.commit("cart/getItemFromLocalStorage");
    store.commit("cart/countTotal");

    const storeInfo = computed(() => {
      let store = localStorage.getItem("storeInfo");
      return store ? JSON.parse(store) : {};
    });
    const cartItems = computed(() => {
      return store.getters["cart/cartItems"];
    });
    const user = computed(() => {
      let localeUserInfo = localStorage.getItem("user");
      return localeUserInfo ? JSON.parse(localeUserInfo) : "";
    });
    const cartTotal = computed(() => {
      return store.getters["cart/cartTotal"];
    });
    const deliveryState = computed(() => {
      return store.getters["order/delivery"];
    });
    const checkOutErrorMsg = computed(() => {
      return store.getters["order/checkOutErrorMsg"];
    });

    const isMobile = computed(() => {
      return uaparser.getDevice();
    });

    async function checkOut() {
      isLoading.value = true;
      try {
        const res = await store.dispatch("order/checkOrderInfo");
        if (isMobile.value.type === "mobile") {
          window.location = res.data;
        } else {
          checkoutUrl.value = res.data;
        }
        const user = {
          userInfo: store.getters["order/userInfo"],
          recipientInfo: store.getters["order/recipientInfo"],
        };
        user.userInfo.signed = store.getters["order/userInfoSigned"];
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        checkoutUrl.value = "";
      }

      // try{
      //   const traceRes= await store.dispatch("order/postAnalyzeData");
      //    console.log(traceRes)
      // }catch(err){
      //   console.log(err)
      // }

      isLoading.value = false;
    }

    function toggleStatement(val) {
      statementPopup.value = val;
    }

    function colseQrPopup() {
      checkoutUrl.value = "";
    }

    function signedStatement(val) {
      store.commit("order/setUserInfo", {
        type: "signed",
        value: val,
      });
    }

    watch(checkOutErrorMsg, () => {
      if (checkOutErrorMsg.value.length > 0) {
        setTimeout(() => {
          store.commit("order/checkOutErrorMsg", "");
        }, 2000);
      }
    });

    return {
      cartItems,
      user,
      cartTotal,
      t,
      isLoading,
      deliveryState,
      storeInfo,
      checkOut,
      checkoutUrl,
      checkOutErrorMsg,
      statementPopup,
      toggleStatement,
      signedStatement,
      colseQrPopup,
    };
  },
};
</script>

<style scoped lang="scss">
section {
  padding: 10em 1em 6em 1em;
  margin-bottom: 3em;
  @media screen and (max-width: 500px) {
    padding: 4em 1.5em 4em 1.5em;
  }
}
h1 {
  font-size: var(--f-xl);
  font-weight: 400;
}
.checkOut_btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  margin-top: 4em;

  p {
    position: absolute;
    top: -1.5em;
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--f-mi);
    color: var(--orange-1);
    white-space: nowrap;
  }
}

.cart_list {
  width: 80%;
  margin: 0 auto;
  color: var(--grey-4);
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

  @media screen and (max-width: 500px) {
    width: 100%;
  }
}

.develivery_info,
.order_info {
  width: 80%;
  margin: 2em auto;

  @media screen and (max-width: 500px) {
    width: 100%;
  }
}
</style>
