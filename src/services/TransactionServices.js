import { useTranslation } from "../auto-il8n";
import api from "./Api";
export const SendFunds = async formData => {
  const response = await api.post("/transactions/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};