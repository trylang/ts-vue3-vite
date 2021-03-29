import loginApi from "../apis/login";
export function login(data) {
  return {
    ...loginApi.login,
    data
  };
}

export function getInfo(data) {
  return {
    ...loginApi.userInfo,
    data
  };
}

export function getCurrentUserNav(data) {
  return {
    ...loginApi.userNav,
    data
  };
}

export function logout() {
  return {
    ...loginApi.logout
  };
}

export function authkey() {
  return {
    ...loginApi.authkey
  };
}

export function getmenuTree(data) {
  return {
    ...loginApi.menuTree,
    data
  };
}
