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
    <div class="datepicker">
      <label for="date">取貨日期 : </label>
      <el-date-picker
        v-model="user.date"
        type="date"
        placeholder="取貨日期"
        id="date"
        class="picker"
        @change="getDatePicker"
      />
    </div>
    <div class="delivery">
      <label>{{ t("product delivery") }}</label>
      <label for="takeOut">
        {{ t("in-store pickup") }}
        <input
          type="radio"
          name="deliveryRadio"
          id="takeOut"
          value="takeOut"
          v-model="delivery"
        />
      </label>
      <label for="delivery">
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

    function getDatePicker(value){
      const now=new Date()
      let pickDay=new Date(value)
      if(pickDay.getTime()<now.getTime()){
        pickDay=new Date()
      }
      pickDay=pickDay.toLocaleDateString()
      store.commit("order/setUserInfo", { type: 'date', value: pickDay });
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
      setUserInfo,
      getDatePicker,
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

  .datepicker{
    margin-bottom: 1em;
    label{
      font-size: var(--f-mi);
      margin: .5em 0;
    }
  }
}
</style>
