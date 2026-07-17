import { useTranslation } from "../../auto-il8n";
import React, { useEffect, useState } from "react";
export default function Fdicpop() {
  const {
    t
  } = useTranslation();
  const [isopen, setIsopen] = useState(true);
  useEffect(() => {
    setIsopen(true);
    setTimeout(() => {
      setIsopen(false);
    }, 5000);
  }, [isopen]);
  if (!isopen) {
    return null;
  }
  return <div className="fdic-pop">
            <div>
                <h3>{t("fdic")}</h3>
            <p>{t("fdic_insured_backed_by_the_full_faith_and_credit_of_the_us")}</p>
            </div>
        </div>;
}