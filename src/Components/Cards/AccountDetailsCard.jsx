import { useTranslation } from "../../auto-il8n";
import React from "react";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import CustomImage from "../Images/CustomImage";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function AccountDetilsCard({
  style,
  className,
  name,
  number,
  balance,
  date,
  country,
  isopen,
  onclose,
  ...props
}) {
  const {
    t
  } = useTranslation();
  if (!isopen) {
    return null;
  }
  return <section className="verification-overlay card-overlay">
      <div style={style} className={className} {...props}>
        <CustomButton onClick={onclose} className="close-details">
          <Icon name="IoClose" />
        </CustomButton>
        <span className="detail-card-head">
          <h2>{t("account_details")}</h2>
        </span>
        <div className="detail-card-body">
          <div className="details-card-row">
            <small>{t("bank_name")}</small>
            <strong>{t("lead_community_bank")}</strong>
          </div>
          <div className="details-card-row">
            <small>{t("accoun_name")}</small>
            <strong>{name}</strong>
          </div>
          <div className="details-card-row">
            <small>{t("account_number")}</small>
            <strong>{number}</strong>
          </div>
          <div className="details-card-row">
            <small>{t("balance")}</small>
            <strong>{balance}</strong>
          </div>
          <div className="details-card-row">
            <small>{t("country_region")}</small>
            <strong>{country}</strong>
          </div>
          <div className="details-card-row">
            <small>{t("created_date")}</small>
            <strong>{date}</strong>
          </div>
        </div>
      </div>
    </section>;
}