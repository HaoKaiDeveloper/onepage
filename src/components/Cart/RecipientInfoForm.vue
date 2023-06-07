<template>
  <form>
    <label for="ditto" class="ditto">
      <input type="checkbox" id="ditto" v-model="sameAsUserInfo" />
      {{ t("the same as above") }}
    </label>
    <input
      type="text"
      :placeholder="t('subscriber name')"
      name="name"
      :value="recipientInfo.name"
      @input="setRecipientInfo"
    />
    <input
      type="tel"
      :placeholder="t('contact phone number')"
      name="phone"
      :value="recipientInfo.phone"
      @input="setRecipientInfo"
    />
    <input
      type="email"
      placeholder="Email"
      name="email"
      :value="recipientInfo.email"
      @input="setRecipientInfo"
    />
    <div class="addressRow">
      <select name="" @change="selectCity">
        <option value="" disabled :selected="recipientInfo.countyCity === ''">
          縣市
        </option>

        <option
          v-for="city in countyCity"
          :key="city.dscr"
          :value="city.lookupCode"
          :selected="recipientInfo.countyCity === city.dscr"
        >
          {{ city.dscr }}
        </option>
      </select>

      <select name="" @change="selectDistrict">
        <option value="" disabled :selected="recipientInfo.district === ''">
          鄉鎮市區
        </option>

        <option
          v-for="city in district"
          :value="city.type3"
          :key="city.dscr"
          :selected="recipientInfo.district === city.dscr"
        >
          {{ city.dscr }}
        </option>
      </select>

      <input type="text" disabled :value="recipientInfo.areaCode" />
      <input
        type="text"
        name="addr"
        :placeholder="t('address')"
        v-model="recipientInfo.addr"
        @input="setRecipientInfo"
      />
    </div>
  </form>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["userInfo"],
  setup(props) {
    const store = useStore();
    const { t } = useI18n();
    const sameAsUserInfo = ref(false);
    const userInfo = computed(() => {
      return store.getters["order/userInfo"];
    });
    const recipientInfo = computed(() => {
      return store.getters["order/recipientInfo"];
    });
    const allData = ref({});
    const countyCity = ref([]);
    const district = ref([]);

    init();
    async function init() {
      const allCityRes = await store.dispatch("order/getCountyCity");

      if (allCityRes.status === 200) {
        const { CountyCity } = allCityRes.data;
        allData.value = allCityRes.data;
        countyCity.value = CountyCity;

        if (props.userInfo) {
          for (const key in props.userInfo) {
            store.commit("order/setRecipientInfo", {
              type: key,
              value: props.userInfo[key],
            });
          }

          selectCity("", props.userInfo["countyCityCode"]);
          selectDistrict("", props.userInfo["areaCode"]);
        }
      }
    }

    function setRecipientInfo(e) {
      const type = e.target.name;
      const value = e.target.value;
      store.commit("order/setRecipientInfo", { type, value });
    }

    function setSameInfoState(value) {
      if (value === true) {
        const { name, email, phone } = userInfo.value;
        store.commit("order/setSameAsUserInfoState", {
          sameState: true,
          name,
          email,
          phone,
        });
      } else {
        store.commit("order/setSameAsUserInfoState", {
          sameState: false,
          name: "",
          email: "",
          phone: "",
        });
      }
    }

    function selectCity(e, val) {
      store.commit("order/resetCity");
      const type1 = e ? e.target.value : val;
      const { District, CountyCity } = allData.value;
      district.value = District.filter((d) => d.type1 === type1);

      const countyCity = CountyCity.find((c) => c.lookupCode === type1).dscr;
      store.commit("order/setRecipientInfo", {
        type: "countyCityCode",
        value: type1,
      });
      store.commit("order/setRecipientInfo", {
        type: "countyCity",
        value: countyCity,
      });
    }

    function selectDistrict(e, val) {
      const areaCode = e ? e.target.value : val;
      const { District } = allData.value;
      const district = District.find((d) => d.type3 === areaCode).dscr;

      store.commit("order/setRecipientInfo", {
        type: "areaCode",
        value: areaCode,
      });
      store.commit("order/setRecipientInfo", {
        type: "district",
        value: district,
      });
    }

    watch(sameAsUserInfo, () => {
      setSameInfoState(sameAsUserInfo.value);
    });

    return {
      t,
      recipientInfo,
      sameAsUserInfo,
      allData,
      countyCity,
      district,
      selectCity,
      selectDistrict,
      setRecipientInfo,
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
  select {
    display: block;
    width: 100%;
    margin: 0.7em 0;
    font-size: var(--f-mi);
    outline: none;
    border: 1px solid var(--grey-3);
    padding: 0.2em 0.5em;
    border-radius: 7px;
  }
  .ditto {
    font-size: var(--f-s);
    input {
      width: 1em;
    }
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.3em;
  }
}
</style>
