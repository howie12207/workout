import { post, get, put, deleteMethod } from "@/utils/requestBack.js";

// 登入API
export const loginApi = (data) => {
  return post("/admin/signin", data);
};

// 登出API
export const logoutApi = () => {
  return post("/logout");
};

// 取得後台產品清單API
export const getProductslistApi = (page) => {
  return get(`/api/howieg1220/admin/products?page=${page}`);
};

// 修改後台產品API
export const updateProductApi = (method, data, productId) => {
  if (method === "post") {
    return post("/api/howieg1220/admin/product", data);
  } else {
    return put(`/api/howieg1220/admin/product/${productId}`, data);
  }
};

// 刪除後台特定產品API
export const delProductApi = (productId) => {
  return deleteMethod(`/api/howieg1220/admin/product/${productId}`);
};

// 取得後台訂單列表API
export const getOrdersApi = (page) => {
  return get(`/api/howieg1220/orders?page=${page}`);
};

// 取得後台優惠券列表API
export const getCouponsApi = (page) => {
  return get(`/api/howieg1220/admin/coupons?page=${page}`);
};

// 修改後台優惠券API
export const updateCouponApi = (method, data, couponId) => {
  if (method === "post") {
    return post("/api/howieg1220/admin/coupon", data);
  } else {
    return put(`/api/howieg1220/admin/coupon/${couponId}`, data);
  }
};

// 刪除後台特定優惠券API
export const delCouponApi = (couponId) => {
  return deleteMethod(`/api/howieg1220/admin/coupon/${couponId}`);
};
