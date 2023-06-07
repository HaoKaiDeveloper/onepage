import axios from "axios";
import {
  getCountyCityRoute,
  postCreateOrderRoute,
  getQueryOrderRoute,
} from "../../api/api";

export default {
  namespaced: true,
  state() {
    return {
      userInfo: {
        name: "",
        phone: "",
        email: "",
        countyCity: "",
        countyCityCode: "",
        district: "",
        areaCode: "",
        addr: "",
        note: "",
        date:"",
        signed: false,
      },
      recipientInfo: {
        name: "",
        phone: "",
        email: "",
        countyCity: "",
        countyCityCode: "",
        district: "",
        areaCode: "",
        addr: "",
        note: "",
      },
      delivery: false,
      sameAsUserInfo: false,
      checkOutErrorMsg: "",
    };
  },
  getters: {
    delivery(state) {
      return state.delivery;
    },
    userInfo(state) {
      return state.userInfo;
    },
    recipientInfo(state) {
      return state.recipientInfo;
    },
    userInfoSigned(state) {
      return state.userInfo.signed;
    },
    checkOutErrorMsg(state) {
      return state.checkOutErrorMsg;
    },
  },
  mutations: {
    setUserInfo(state, { type, value }) {
      state.userInfo[type] = value;
    },
    setRecipientInfo(state, { type, value }) {
      state.recipientInfo[type] = value;
    },
    setDeliveryState(state, value) {
      state.delivery = value;
    },
    setSameAsUserInfoState(state, value) {
      const { sameState } = value;
      state.sameAsUserInfo = sameState;
      if (sameState) {
        const { name, phone, email } = value;
        state.recipientInfo = { ...state.recipientInfo, name, email, phone };
      } else {
        state.recipientInfo = {
          ...state.recipientInfo,
          name: "",
          email: "",
          phone: "",
        };
      }
    },
    resetCity(state) {
      state.recipientInfo = {
        ...state.recipientInfo,
        countyCity: "",
        countyCityCode: "",
        district: "",
        areaCode: "",
      };
    },
    checkOutErrorMsg(state, value) {
      console.log(value);
      state.checkOutErrorMsg = value;
    },
  },
  actions: {
    async getCountyCity() {
      const res = await axios.get(getCountyCityRoute);
      return res;
    },
    async checkOrderInfo(context, payload) {
      const { userInfo, recipientInfo, delivery } = context.state;
      const storeInfo = JSON.parse(localStorage.getItem("storeInfo"));
      const shopCart = JSON.parse(localStorage.getItem("shopCart"));
      let { name, email, phone,date } = userInfo;
    
      if (
        !name ||
        !email ||
        !email.includes("@") ||
        !phone ||
        isNaN(phone) ||
        phone.length !== 10
      ) {
        context.state.checkOutErrorMsg = "infoAlert";
        console.log("1");
        return;
      }

      if (delivery) {
        for (const [key, value] of Object.entries(recipientInfo)) {
          // 確認每一格都有寫
          if (key !== "note" && !value) {
            context.state.checkOutErrorMsg = "postAlert";
            console.log("2");
            return;
          }
          // 確認電話格式
          if (key === "phone" && (isNaN(value) || value.length !== 10)) {
            context.state.checkOutErrorMsg = "phoneAlert";
            console.log("phone");
            return;
          }
          if (key === "email" && !value.includes("@")) {
            context.state.checkOutErrorMsg = "emailAlert";
            return;
          }
        }
      }
      if (!userInfo.signed) {
        context.state.checkOutErrorMsg = "protectionStatementAlert";
        console.log("3");
        return;
      }

      context.state.checkOut = "";
      const data = {
        projectName: "Store",
        accountId: storeInfo.account,
        referralCode: "",
        amount: "",
        customerName: userInfo.name,
        customerPhoneNumber: userInfo.phone,
        customerEmail: userInfo.email,
        customerPostCode: userInfo.areaCode,
        customerAddr1: userInfo.countyCity,
        customerAddr2: userInfo.district,
        customerAddr3: userInfo.addr,
        recipientName: delivery ? recipientInfo.name : userInfo.name,
        recipientPhoneNumber: delivery ? recipientInfo.phone : userInfo.phone,
        recipientEmail: delivery ? recipientInfo.email : userInfo.email,
        recipientPostCode: delivery
          ? recipientInfo.areaCode
          : userInfo.areaCode,
        recipientAddr1: delivery
          ? recipientInfo.countyCity
          : userInfo.countyCity,
        recipientAddr2: delivery ? recipientInfo.district : userInfo.district,
        recipientAddr3: delivery ? recipientInfo.addr : userInfo.addr,
        referralPhoneNumber: "",
        deliveryMethods: delivery ? "宅配" : "自行取貨",
        countAmountItems: shopCart,
        items: shopCart,
      };
      data.items.forEach((i) => {
        i.productsName = i.name;
        if (i.selectedFormat1) {
          i.productsName += "-" + i.selectedFormat1;
        }
        i.unit = "QQ";
        i.unitPrice = i.price;
        i.totalPrice = i.price;
        delete i.tempId;
      });
      if(!date){
        date=new Date().toLocaleDateString()
      }
      data.countAmountItems[0].description=`取貨日期:${date}; ${data.countAmountItems[0].description}`
      return await axios.post(postCreateOrderRoute, data);
    },
    async getQueryOrder(context, payload) {
      console.log(payload);

      const res = await axios.get(`${getQueryOrderRoute}${payload}`);
      return res;
    },
    // async postAnalyzeData(context, payload) {
    //   const storeInfo = JSON.parse(localStorage.getItem("storeInfo"));
    //   const shopCart = JSON.parse(localStorage.getItem("shopCart"));
    //   // console.log(storeInfo.token, shopCart);

    //   var now = new Date();
    //   var year = now.getFullYear();
    //   var month = (now.getMonth() + 1).toString().padStart(2, "0");
    //   var day = now.getDate().toString().padStart(2, "0");
    //   var hour = now.getHours().toString().padStart(2, "0");
    //   var minute = now.getMinutes().toString().padStart(2, "0");
    //   var second = now.getSeconds().toString().padStart(2, "0");

    //   var dateTime = year + month + day + hour + minute + second;

    //   const res = await axios.post(
    //     "https://a1.intella.co/TraceServer/api/saveTraceInfo",
    //     [
    //       {
    //         AppId: "Scan2Pay",
    //         Platfirm: "web",
    //         UserId: storeInfo.token,
    //         Time: dateTime,
    //         EventName: "checkout",
    //         Params: {
    //           LoginId: storeInfo.token,
    //           Time: dateTime,
    //         },
    //       },
    //     ],
    //     {
    //       withCredentials:true,
    //       headers:{
    //         "Content-Type": "application/json"
    //       }
    //     }
    //   );
    //   // try{
    //   //   const res = await axios.post(
    //   //     "https://a1.intella.co/TraceServer/api/saveTraceInfo",
    //   //     [
    //   //       {
    //   //         AppId: "Scan2Pay",
    //   //         Platform: "web",
    //   //         UserId: "Super",
    //   //         Time: "20220422143050",
    //   //         EventName: "sp_login",
    //   //         Params: {
    //   //           LoginId: "super",
    //   //           Time: "20220422143050",
    //   //         },
    //   //       },
    //   //       {
    //   //         AppId: "Scan2Pay",
    //   //         Platform: "web",
    //   //         UserId: "Super",
    //   //         Time: "20220422143052",
    //   //         EventName: "sp_svrapi",
    //   //         Params: {
    //   //           ApiName: "GenerateOrderId",
    //   //         },
    //   //       },
    //   //     ],
    //   //     {
    //   //       withCredentials:true
    //   //     }
    //   //   );
    //   //     return res

    //   // }catch(err){
    //   //   console.log(err)
    //   // }

    // },
  },
};
