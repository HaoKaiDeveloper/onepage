<template>
  <form>
    <input
      type="text"
      :placeholder="t('subscriber name')"
      name="name"
      :value="user.name"
      @input="setUserInfo"
    />
    <input
      type="tel"
      :placeholder="t('contact phone number')"
      name="phone"
      :value="user.phone"
      @input="setUserInfo"
    />
    <input
      type="email"
      placeholder="Email"
      name="email"
      :value="user.email"
      @input="setUserInfo"
    />
  
    <div class="delivery">
      <label>{{ t("product delivery") }}</label>
      <label for="takeOut" v-if=" storeInfo.shippingMethods.find(s=>s==='0')">
        {{ t("in-store pickup") }}
        <input
          type="radio"
          name="deliveryRadio"
          id="takeOut"
          value="takeOut"
          v-model="delivery"
        />
      </label>
      <label for="delivery"  v-if=" storeInfo.shippingMethods.find(s=>s==='1')">
        {{ t("home delivery") }}
        <input
          type="radio"
          name="deliveryRadio"
          id="delivery"
          value="delivery"
          v-model="delivery"
        />
      </label>
    </div>
  </form>
</template>

<script>
import { useI18n } from "vue-i18n";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  props: ["userInfo"],
  setup(props) {
    const delivery = ref("takeOut");
    const store = useStore();

    const user = computed(() => {
      return store.getters["order/userInfo"];
    });

    const storeInfo=computed(()=>{
    let info=localStorage.getItem('storeInfo')
    if(info){
      info=JSON.parse(info)
      return info
    }else{
      return null
    }
    })

    init()
    function init(){
      const takeOutState=storeInfo.value.shippingMethods.find(s=>s==='0')
      const postState=storeInfo.value.shippingMethods.find(s=>s==='1')
      if(takeOutState&&!postState){
        delivery.value='takeOut'
      }
       if(!takeOutState&&postState){
        delivery.value='delivery'
      }
      if(takeOutState&&postState){
        delivery.value='takeOut'
      }
      setDeliveryState()
    }


    if (props.userInfo) {
      for (const key in props.userInfo) {
        user.value[key] = props.userInfo[key];
        store.commit("order/setUserInfo", {
          type: key,
          value: props.userInfo[key],
        });
      }
    }

    function setUserInfo(e) {
      const { name, value } = e.target;
      store.commit("order/setUserInfo", { type: name, value: value });
    }

    function setDeliveryState() {
      const result = delivery.value !== "takeOut";
      store.commit("order/setDeliveryState", result);
    }

    watch(delivery, () => {
      setDeliveryState();
    });

    const { t } = useI18n();
    return {
      t,
      delivery,
      setDeliveryState,
      storeInfo,
      setUserInfo,
      user,
    };
  },
};
</script>

<style scoped lang="scss">
form {
  width: 100%;
  max-width: 50em;

  input {
    display: block;
    width: 100%;
    border-bottom: 0.7px solid var(--grey-5);
    margin: 0.7em 0;
    font-size: var(--f-mi);
    outline: none;
    padding: 0 0.5em;
  }
  .delivery {
    label {
      font-size: var(--f-s);
      margin: 0 0.5em;
    }

    label:first-child {
      display: block;
      font-size: var(--f-mi);
      margin: 0 0em;
    }

    input {
      width: 1em;
      display: inline;
    }
  }

 
}
</style>
