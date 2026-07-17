import { useTranslation } from "../auto-il8n";
import axios from "axios";
import { BaseUrl } from "../../env.config";
import api from "./Api";
export const login = async (email, password) => {
  const response = await axios.post(`${BaseUrl}/login/`, {
    email,
    password
  });

  // Only save tokens if they exist
  if (response.data.access) {
    const {
      access,
      refresh,
      user
    } = response.data;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("login_time", Date.now());
  }
  return response.data;
};
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};
export const CreateNewuser = async formData => {
  const response = await api.post("/signup/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};
export const uploadimage = async formData => {
  const response = await api.put("/user/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response;
};
export const ChangePassword = async formData => {
  const response = await api.post("/user/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response;
};
export const Changepin = async formData => {
  const respose = await api.patch("/user/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return respose;
};
export const forgotPassword = async (type, email) => {
  const response = await api.post("/security/reset/", {
    type,
    email
  });
  return response.data;
};
export const Resetpassword = async (password, token) => {
  const response = await api.put("/security/reset/", {
    password,
    token
  });
  return response.data;
};
export const ResetTransactionPin = async (pin, token) => {
  const response = await api.patch("/security/reset/", {
    pin,
    token
  });
  return response.data;
};
export const Set2FA = async value => {
  const response = await api.post("/security/", {
    value
  });
  return response.data;
};
export const VerifyEmail = async otp => {
  const response = await axios.post(`${BaseUrl}/verification/`, {
    otp
  });

  //console.log("VerifyEmail response", response.data);

  const {
    access,
    refresh,
    user
  } = response.data;
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem("login_time", Date.now());
  return response.data;
};
export const ResendOTp = async email => {
  const response = await axios.put(`${BaseUrl}/verification/`, {
    email
  });
  return response.data;
};