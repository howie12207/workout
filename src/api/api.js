import { get, post, deleteMethod } from "@/utils/request.js";

// 取得所有產品API
export const getProductsApi = () => {
  return get("/products/all");
};

// 取得個別產品API
export const getProductApi = (productId) => {
  return get(`/product/${productId}`);
};

// 取得購物車清單API
export const getCartApi = () => {
  return get("/cart");
};

// 加入購物車API
export const addCartApi = (data) => {
  return post("/cart", data);
};

// 移除購物車API
export const removeCartApi = (item) => {
  return deleteMethod(`/cart/${item}`);
};

// 套用優惠券API
export const submitCouponApi = (data) => {
  return post("/coupon", data);
};

// 送出訂單API
export const submitOrderApi = (data) => {
  return post("/order", data);
};

// 取得特定訂單API
export const getOrderApi = (orderId) => {
  return get(`/order/${orderId}`);
};

// 付款API
export const payApi = (orderId) => {
  return post(`/pay/${orderId}`);
};
