<template>
  <section>
    <div class="img-box">
      <img :src="storeInfo.banner" alt="background" v-if="storeInfo.banner" />
      <div class="radius-box"></div>
    </div>

    <article v-if="storeInfo.name">
      <div class="shop_info">
        <h1>
          {{ activeLanguage !== "tw" ? tr(storeInfo.name) : storeInfo.name }}
        </h1>
        <p v-if="storeInfo.time">{{ t("business hours") }} : {{ storeInfo.time }}</p>
        <p v-if="storeInfo.phone.length > 4">
          {{ t("store tel") }} : {{ storeInfo.phone }}
        </p>
        <div v-if="storeInfo.link.length > 4">
          {{ t("web link") }} :
          <a :href="storeInfo.link" target="blank">
            <v-icon icon="mdi-link-variant" />
          </a>
        </div>
      </div>

      <div class="language_tab">
        <LangBtn lang="tw" />
        <LangBtn lang="en" v-if="langObj.englishName"/>
        <LangBtn lang="japan" v-if="langObj.japaneseName"/>
        <LangBtn lang="korean" v-if="langObj.koreanName"/>
      </div>

      <div class="product_list">
        <ProductListCard
          v-for="p in storeProducts"
          :key="p.productId"
          :p="p"
          :lang="activeLanguage"
        />
      </div>
      <div class="storeIntro" v-if="storeInfo.customHTML">
        <h1>店家介紹 : </h1>
        <div v-html="storeInfo.customHTML"></div>
      </div>
    </article>

    <CartBtn />
  </section>
</template>

<script>
import ProductListCard from "../components/Product/ProductListCard.vue";
import CartBtn from "../components/Cart/CartBtn.vue";
import LangBtn from "../components/Home/languageBtn.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { computed, watch } from "vue";
import { transliterate as tr } from "transliteration";

export default {
  components: { ProductListCard, CartBtn, LangBtn },
  setup() {
    const store = useStore();
    const { query } = useRoute();
    const { t, locale } = useI18n();

    const storeInfo = computed(() => {
      return store.getters["shop/storeInfo"];
    });
    const storeProducts = computed(() => {
      return store.getters["shop/storeProducts"];
    });
    const activeLanguage = computed(() => {
      return store.getters["shop/lang"];
    });

    const langObj=computed(()=>{
      const obj={name:false,englishName:false,japaneseName:false,koreanName:false};
      storeProducts.value.forEach(p=>{
            if(p.name){
              obj.name=true
            }
            if(p.englishName){
              obj.englishName=true
            }
            if(p.japaneseName){
              obj.japaneseName=true
            }
            if(p.koreanName){
              obj.koreanName=true
            }
          })
        return obj  
    })

    init();
    async function init() {
      locale.value = activeLanguage.value;
      let queryAcc = query.acc;
      if (!queryAcc) return;
      try {
        await Promise.all([
          store.dispatch("shop/getstoreinfo", {
            account: queryAcc,
          }),
          store.dispatch("shop/getproducts", {
            account: queryAcc,
          }),
        ]);
       
      } catch (err) {
        console.log(err);
      }
    }

    watch(activeLanguage, () => {
      locale.value = activeLanguage.value;
    });

    return {
      activeLanguage,
      storeProducts,
      storeInfo,
      langObj,
      t,
      tr,
      locale,
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.img-box {
  width: 100%;
  max-width: 1500px;
  height: 100%;
  // min-height: 200px;
  // max-height:500px;
  background-color: #fff;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    max-height:400px;
    min-height: 300px;
    object-fit:cover;
  }

  .radius-box {
    width: 101%;
    height: 4.5em;
    border-radius: 30px 30px 0 0;
    background-color: var(--back-color);
    position: absolute;
    bottom: -2.5em;
    left: 50%;
    transform: translateX(-50%);
  }
}

article {
  max-width: 1500px;
  margin-top: -2.5em;
  min-height: 95vh;
  letter-spacing: 1.5px;
  padding: 2.5em 4em;
  position: relative;
  z-index: 2;
  color: var(--grey-5);

  @media screen and (max-width: 900px) {
    padding: 2em 0.5em;
  }
  @media screen and (max-width: 500px) {
    padding: 2em 1.5em 5em 1.5em;
  }
}

.shop_info {
  font-size: var(--f-s);
  h1 {
    font-size: var(--f-xl);
    font-weight: 500;
  }
  p {
    color: var(--grey-4);
  }
  a {
    color: var(--grey-3);
    font-size: 1rem;
    text-decoration: none;
  }
}

.language_tab {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5em;
  margin: 1.5em 0;
  @media screen and (max-width: 500px) {
    flex-wrap: wrap;
  }
}

.product_list {
  width: 100%;
  margin: 2em auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 20em;
  gap: 2em;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: 500px) {
    gap: 3em;
    grid-auto-rows: 30vw;
  }
}
.storeIntro{
  width: 100%;
  margin: 0 auto;
  margin-bottom: 4em;
  color: var(--grey-4);
  font-size: var(--f-s);
  h1{
    font-size: var(--f-l);
  }
  div{
    max-width: 800px;
  }
}
</style>
