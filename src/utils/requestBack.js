import axios from "axios";

const instance = axios.create({
  baseURL: "https://vue-course-api.hexschool.io",
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res.statusText);
    }
  },
  (err) => {
    if (err.response) {
      return Promise.reject(err.response);
    } else {
      return Promise.reject(new Error("請求超時，請刷新頁面重試"));
    }
  }
);

export const get = (url, params, config = {}) => {
  return instance({
    method: "get",
    url,
    params,
    ...config,
  })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const post = (url, data, config = {}) => {
  return instance({
    method: "post",
    url,
    data,
    ...config,
  })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const put = (url, data, config = {}) => {
  return instance({
    method: "put",
    url,
    data,
    ...config,
  })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const deleteMethod = (url, data, config = {}) => {
  return instance({
    method: "delete",
    url,
    data,
    ...config,
  })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
