<template>
  <section>
    <nav>
      <img :src="scan2paylogo" alt="scan2paylogo" />
    </nav>
    <main>
      <div class="result_msg" v-if="status === 'Trade success'">
        <img :src="resultSuccess" alt="success" />
        <h1>交易成功</h1>
        <p>{{ dateStamp }}</p>
      </div>
      <div class="result_msg" v-else>
        <img :src="resultFail" alt="success" />
        <h1>交易失敗</h1>
        <p>{{ dateStamp }}</p>
      </div>
      <div class="orderinfo">
        <h1>{{ orderInformation.storeName }}</h1>
        <ul>
          <li>
            <p>訂單金額</p>
            <p>
              <v-icon icon="mdi-currency-usd" />
              {{ orderInformation.totalAmount }}
            </p>
          </li>
          <li>
            <p>商品名稱</p>
            <div>
              <p
                v-for="item in orderInformation.orderInfo"
                :key="item.productsName"
                class="item"
              >
                {{ item.productsName }} X {{ item.quantity }}
              </p>
            </div>
          </li>
          <li>
            <p>訂單編號</p>
            <p>{{ orderInformation.orderId }}</p>
          </li>
          <li>
            <p>交易日期</p>
            <p>{{ dateStamp }}</p>
          </li>
          <li>
            <p>狀態代碼</p>
            <p>{{ statusCode }}</p>
          </li>
        </ul>
      </div>

      <div class="trade_status" v-if="status === 'Trade success'">
        <article :class="{ completed: shippingStatus === 0 }">
          <span><v-icon icon="mdi-check" /></span>
          訂單已付款
        </article>
        <article :class="{ completed: shippingStatus === 1 }">
          <span>1</span>
          商家已接受訂單
        </article>
        <article :class="{ completed: shippingStatus === 2 }">
          <span>2</span>
          商家已出貨
        </article>
        <article :class="{ completed: shippingStatus === 3 }">
          <span>3</span>
          訂單已取消
        </article>
      </div>
    </main>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { useRoute } from "vue-router";
import scan2paylogo from "../assets/scan2pay_logo.png";
import resultSuccess from "../assets/result_success.png";
import resultFail from "../assets/result-fail-red.png";
export default {
  setup() {
    const store = useStore();
    const { query } = useRoute();
    const status = ref("");
    const statusCode = ref("");
    const shippingStatus = ref("");
    const orderInformation = ref({});
    const dateStamp = ref("");

    init();
    async function init() {
      if (!query.orderNo) return;
      try {
        const res = await store.dispatch("order/getQueryOrder", query.orderNo);
        console.log(res);
        if (res.status === 200 && res.data.msgCode === "0000") {
          const { data } = res;
          status.value = data.data.status;
          statusCode.value = data.msgCode;
          shippingStatus.value = data.data.shippingStatus;
          orderInformation.value = data.data;
          dateStamp.value = orderInformation.value.dateStamp
            .replace("T", " ")
            .replace("+08:00", " ");
        }
      } catch (err) {
        console.log(err);
      }
    }

    return {
      scan2paylogo,
      resultSuccess,
      resultFail,
      status,
      statusCode,
      shippingStatus,
      orderInformation,
      dateStamp,
    };
  },
};
</script>

<style scoped lang="scss">
section {
  letter-spacing: 2px;
  padding-bottom: 3em;
}
nav {
  width: 100%;
  height: 60px;
  background-color: #98bf48;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    max-width: 400px;
    object-fit: cover;
  }
}

.result_msg {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  margin: 2em auto;
  padding: 2em 0;
  border-bottom: 1.5px solid var(--grey-3);
  img {
    width: 6em;
  }
  h1 {
    font-size: var(--f-l);
    color: var(--grey-4);
  }
  p {
    font-size: var(--f-mi);
    color: var(--grey-3);
  }
}

.orderinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  h1 {
    font-size: 2.5em;
  }
  li {
    border-top: 1px solid var(--grey-3);
    font-size: var(--f-mi);
    color: var(--grey-3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5em;
    padding: 0.7em;
    letter-spacing: 1px;
    i {
      font-size: 21px;
      margin-top: -3px;
    }
    p:nth-child(1) {
      font-weight: 600;
      color: var(--grey-4);
    }
    p.item {
      font-weight: 500;
      color: var(--grey-3);
    }
  }
}
.trade_status {
  display: flex;
  flex-direction: column;
  justify-content: center;
  article {
    display: flex;
    align-items: center;
    margin: 1.5em auto;
    width: 100%;
    max-width: 230px;
    font-size: var(--f-mi);
    color: var(--grey-3);
    span {
      display: block;
      width: 1.5em;
      height: 1.5em;
      background-color: var(--grey-3);
      border-radius: 50%;
      color: var(--grey-1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 1em;
    }

    &.completed {
      font-weight: 600;
      color: var(--grey-4);
      span {
        background-color: #98bf48;
      }
    }
  }
}
</style>
