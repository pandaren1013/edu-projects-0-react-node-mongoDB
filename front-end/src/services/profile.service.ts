import axios from "axios";

const API_URL = "http://localhost:8090/api/profile/";


export const getCurrentUser = () => {
    const token = localStorage.getItem("auth_token");
    return axios.get(API_URL + "/", {
      headers: {
        "x-access-token": token,
      },
    });
  };

  export const updateUser = (formData: any) => {
    const token = localStorage.getItem("auth_token");
    console.log('token',token)
    console.log('data',formData)
    return axios({
      method: "post",
      url: API_URL + "update",
      data: formData,
      headers: { "x-access-token": token },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };