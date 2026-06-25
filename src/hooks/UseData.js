import { useState, useEffect } from "react";
import UseFetch from "./UseFetch";
import { BaseUrl } from "../../env.config";
import { AuthHeaders } from "../helpers/headers";

export const useData = () => {
  const [userdata, setUserData] = useState({} || null);
  const [useraccount, setaccount] = useState({
    total_balance_usd: 0,
    accounts: [],
  });
  const [transactions, setTransaction] = useState([]);
  const [cardData, setCardData] = useState({});
  const [cardTransactions, setCardTransaction] = useState([]);
  const [supportData, setSupportData] = useState({
    support: {},
    paymentWays: []
  })

  const { data: userinfo } = UseFetch(`${BaseUrl}/user/data/`, "user data", {
    headers: AuthHeaders(),
  });

  const { data: useraccounts } = UseFetch(
    `${BaseUrl}/user/accounts/`,
    "user accounts",
    {
      headers: AuthHeaders(),
    },
  );

  const { data: usertransactions } = UseFetch(
    `${BaseUrl}/transactions/`,
    "user transaction",
    {
      headers: AuthHeaders(),
    },
  );

  const { data: cardinfo } = UseFetch(
    `${BaseUrl}/card/`,
    "user card",
    {
      headers: AuthHeaders(),
    },
  );

  const { data: cardtransaction } = UseFetch(
    `${BaseUrl}/card/transactions/`,
    "user card transaction",
    {
      headers: AuthHeaders(),
    },
  );

  const { data: supportdata } = UseFetch(
    `${BaseUrl}/support/`,
    "company support",
  );

  useEffect(() => {
    if (userinfo) {
      setUserData(userinfo);
    }
  }, [userinfo]);

  useEffect(() => {
    if (useraccounts) {
      setaccount(useraccounts);
    }
  }, [useraccounts]);

  useEffect(() => {
    if (usertransactions) {
      setTransaction(usertransactions);
    }
  }, [usertransactions]);

  useEffect(() => {
    if (cardinfo) {
      setCardData(cardinfo);
    }
  }, [cardinfo]);

  useEffect(() => {
    if (cardtransaction) {
      setCardTransaction(cardtransaction);
    }
  }, [cardtransaction]);

  useEffect(() => {
    if (supportdata) {
      setSupportData(supportdata);
    }
  }, [supportdata]);


  return {
    userdata,
    useraccount,
    transactions,
    cardData,
    cardTransactions,
    supportData,
  };
};
