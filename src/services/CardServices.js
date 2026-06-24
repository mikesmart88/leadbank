import api from "./Api";

export const UpdateCardFreeze = async (formData) => {
  const response = await api.patch("/card/", formData, {
    headers: {
            "Content-Type": "multipart/form-data"
        }
  });

  return response.data;
};


export const DeleteCard = async () => {
  const response = await api.delete("/card/")
  return response.data;
}

export const CreateCard = async () => {
  const response = await api.post("/card/")
  return response.data;
}