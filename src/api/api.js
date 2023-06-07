// const scan2payCartServerHostApi = `${process.env.VUE_APP_SCAN2PAY_CART_SERVER_DOMAIN_URI}cart-server/api/`

const scan2payCartServerHostApi = `https://a.intella.co/cart-server/api/`;

const getCountyCityRoute = `${scan2payCartServerHostApi}cart/getCountyCity`;
const postCreateOrderRoute = `${scan2payCartServerHostApi}order/newcreate`;
const postCreateCashOrderRoute = `${scan2payCartServerHostApi}order/createByCash`;
const getQueryOrderRoute = `${scan2payCartServerHostApi}order/getOrder?odno=`;
const getCashQueryOrderRoute = `${scan2payCartServerHostApi}order/getCashOrder?odno=`;
export {
  getCountyCityRoute,
  postCreateOrderRoute,
  postCreateCashOrderRoute,
  getQueryOrderRoute,
  getCashQueryOrderRoute,
};

// export async function getCountyCity() {
//   return (await request.get("cart/getCountyCity")).data;
// }

// export async function postCreateOrder(data) {
//   return (await request.post("order/newcreate", data)).data;
// }

// export async function postCreateCashOrder(data) {
//   return (await request.post("order/createByCash", data)).data;
// }

// export async function getQueryOrder(queryString) {
//   return (await request.get(`order/getOrder?odno=${queryString}`)).data;
// }

// export async function getCashQueryOrder(queryString) {
//   return (await request.get(`order/getCashOrder?odno=${queryString}`)).data;
// }
