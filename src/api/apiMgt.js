// const mgtHost = process.env.VUE_APP_ONEPAGE_SERVER_DOMAIN_URI;
const mgtHost = "https://mgt.intella.co/mgt-server/";

const getstoreinfoRoute = `${mgtHost}onepage/api/getstoreinfo`;
const getproductsRoute = `${mgtHost}onepage/api/getproductsbytoken`;
const getSingleproductRoute = `${mgtHost}onepage/api/getproduct`;

export { getstoreinfoRoute, getproductsRoute, getSingleproductRoute };

// const api = axios.create({});
// export default {
//   api,
//   getstoreinfo(data) {
//     return api({
//       method: "post",
//       url: `${mgtHost}onepage/api/getstoreinfo`,
//       data: data,
//     });
//   },
//   getproductsbytoken(data) {
//     return api({
//       method: "post",
//       url: `${mgtHost}onepage/api/getproductsbytoken`,
//       data: data,
//     });
//   },
//   getproduct(data) {
//     return api({
//       method: "post",
//       url: `${mgtHost}onepage/api/getproduct`,
//       data: data,
//     });
//   },
// };
