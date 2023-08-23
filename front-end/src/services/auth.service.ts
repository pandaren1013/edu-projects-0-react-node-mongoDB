import axios from "axios";

const API_URL = "http://localhost:8090/api/auth/";

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("auth_token", response.data.accessToken);
      }

      return response.data;
    });
};

export const updateUser = (formData: any) => {
  const token = localStorage.getItem("auth_token");
  return axios({
    method: "post",
    url: API_URL + "update",
    data: formData,
    headers: { "x-access-token": token },
  })
    .then(function (response) {
      //handle success
    })
    .catch(function (response) {
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};


