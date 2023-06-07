<template>
  <div class="statement_popup">
    <div>
      <h1>個人資料保護聲明</h1>
      <p>
        「英特拉金融科技股份有限公司」非常尊重客戶的隱
        私權，對於客戶資料的蒐集、處理及利用均遵守中華
        民國政府之「個人資料保護法」及相關法令規範，您
        可以參照以下隱私權政策，了解我們的具體措施 一、客戶資料蒐集方式
        我們擁有客戶的個人資料，是由向本購物平台銷售通
        路及其相應行動應用程式註冊會員或消費之客戶所提
        供，或是由我們在其他行銷或異業結盟活動中合法取
        得(包括但不限於自業務合作廠商處取得)。 二、客戶資料蒐集種類
        我們會依據本平台各通路提供之服務，請客戶提供必 要之作業資料：
        (1)平台之會員或客戶，我們會請您提供基本資料：
        包含您提供之姓名、性別、身分證統一編號、出生年
        月日、聯絡電話、聯絡地址、電子郵件信箱及其他您 主動提供之資料。
        (2)當您指定商品配送服務時，我們會請您提供配送
        資料：包含收件人之姓名、聯絡電話、聯絡地址及其 他必要配送聯絡資料。
        (3)當您有實際消費行為時，我們會留存您的帳務資料
        。但若您選擇使用應用程式內含的Apple Pay、 Google
        Pay或其他第三方的付款方式，相關資訊將會
        依據該第三方服務供應商的隱私權條款進行保護與管 理。
        (4)我們基於提供市場分析、贈獎活動、會員及客戶權
        益通知等相關服務，將會為必要作業將請您提供其他 資料。
        依據法務部頒佈之「個人資料保護法之特定目的及個
        人資料之類別」，本公司蒐集、處理、利用及保有您 個人資料之種類列示如下：
        Ｃ○○一 辨識個人者。(例如：姓名、職稱、住址、
        工作地址、以前地址、住家電話號碼、行動電話、網
        路平臺申請之帳號、會員編號、通訊及戶籍地址、電
        子郵遞地址及其他任何可辨識資料本人者等。) Ｃ○○二
        辨識財務者。(例如：金融機構帳戶之號碼
      </p>
      <button @click="closePopup">確認</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["close-statement"],
  setup(props, { emit }) {
    function closePopup() {
      emit("close-statement", false);
    }
    return {
      closePopup,
    };
  },
};
</script>

<style lang="scss" scoped>
.statement_popup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;

  div {
    width: 100%;
    max-width: 600px;
    min-width: 250px;
    height: 80%;
    background-color: var(--grey-1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1em;

    h1 {
      width: 100%;
      padding: 0.6em 0;
      font-size: var(--f-l);
      background-color: var(--orange-2);
      text-align: center;
    }
    p {
      font-size: 1rem;
      margin-bottom: 1em;
      padding: 0.5em;
      overflow: auto;
    }
    button {
      background-color: var(--orange-1);
      font-size: var(--f-mi);
      color: var(--grey-1);
      padding: 0.2em 1em;
      border-radius: 20px;
    }
  }
}
</style>
