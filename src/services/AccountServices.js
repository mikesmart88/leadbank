import api from "./Api";

export const createAccount = async (formData) => {
    const response = await api.post("/user/accounts/", formData, {
    headers: {
            "Content-Type": "multipart/form-data"
        }
  });

  return response.data;
}