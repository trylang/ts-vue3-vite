// const base = process.env.VUE_APP_USER_ROOT;
const base =
  "https://www.fastmock.site/mock/7193cae0dfb1fa231e05e1c51a9d4844/lol";

export default {
  login: {
    url: `${base}/user/auth/login`,
    method: "post"
  },
  logout: {
    url: `${base}/user/auth/logout`,
    method: "post"
  },
  //公钥key
  authkey: {
    url: `${base}/user/auth/key`,
    method: "post"
  },

  menuTree: {
    url: `${base}/user/menu/tree`,
    method: "get"
  },

  login_temp: {
    url: `${base}/user/auth/login`,
    method: "post"
  },
  menuTree_temp: {
    url: `${base}/user/menu/tree`,
    method: "post"
  }
};
