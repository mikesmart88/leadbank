import api from "./Api";

export const createAccount = async (formData) => {
    const response = await api.post("/user/accounts/", formData, {
    headers: {
            "Content-Type": "multipart/form-data"
        }
  });

  return response.data;
}

// src/services/currencyService.js

const BASE_URL = "https://open.er-api.com/v6/latest";

export const convertToUSD = async (amount, currency) => {
  try {
    const response = await fetch(`${BASE_URL}/${currency}`);

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();

    if (data.result !== "success") {
      throw new Error(data["error-type"] || "Exchange rate error");
    }

    return amount * data.rates.USD;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const formatUSD = async (amount, currency) => {
  const usd = await convertToUSD(amount, currency);

  if (usd === null) return null;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(usd);
};

export const getPrice = async (amount, currency) => {
    const usd = await convertToUSD(amount, currency);
    console.log(usd)
    return usd;
}