import { useTranslation } from "../auto-il8n";
import { BaseUrl } from "../../env.config";
import api from "./Api";
export const submitKYC = async formData => {
  const response = await api.post('/account/verify/', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};