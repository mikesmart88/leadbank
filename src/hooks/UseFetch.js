import { useState, useEffect } from "react";

const UseFetch = (url, key = null, option={}) => {
  const [data, setdata] = useState(null) || []; // data state
  const [Loading, setLoading] = useState(true); // loading state
  const [error, seterror] = useState(null); // error state

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      seterror(null);
      try {
        const response = await fetch(url, option);
        if (!response.ok) {
          throw new Error(`an error has occured: ${response.status}`);
        }

        const json = await response.json();
        setdata(json);
      } catch (err) {
        seterror(err.message);
        console.log("fetch eror:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, [url, key]);

  return { data, Loading, error };
};

export default UseFetch;
