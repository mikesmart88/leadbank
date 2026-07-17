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

export default function CardDetailsCard({
  style,
  className,
  name,
  number,
  cvv,
  expiry,
  billing,
  zipcode,
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
          <h2>{t("card_details")}</h2>
        </span>
        <div className="detail-card-body">
          <div className="details-card-row">
            <small>{t("card_name")}</small>
            <strong>{name}</strong>
          </div>
          <div className="details-card-row">
            <small>{t("card_number")}</small>
            <strong>{number}</strong>
          </div>
          <div className="details-card-row">
            <small>{t("cvv")}</small>
            <strong>{cvv}</strong>
          </div>
          <div className="details-card-row">
            <small>{t("expiry_date")}</small>
            <strong>{expiry}</strong>
          </div>
          <div className="details-card-row">
            <small>{t("billing_address")}</small>
            <strong>{billing}</strong>
          </div>
          <div className="details-card-row">
            <small>{t("zip_code")}</small>
            <strong>{zipcode}</strong>
          </div>
        </div>
      </div>
    </section>;
}