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

  useEffect(() => {
    if (userinfo) {
      setUserData(userinfo);
    }
  });

  useEffect(() => {
    if (useraccounts) {
      setaccount(useraccounts);
    }
  });

  return {
    userdata,
    useraccount,
  };
};
