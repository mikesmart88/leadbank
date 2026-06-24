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
  if (!isopen) {
    return null;
  }
  return (
    <section className="verification-overlay card-overlay">
      <div style={style} className={className} {...props}>
        <CustomButton onClick={onclose} className="close-details">
          <Icon name="IoClose" />
        </CustomButton>
        <span className="detail-card-head">
          <h2>Card Details</h2>
        </span>
        <div className="detail-card-body">
          <div className="details-card-row">
            <small>Card name</small>
            <strong>{name}</strong>
          </div>
          <div className="details-card-row">
            <small>Card number</small>
            <strong>{number}</strong>
          </div>
          <div className="details-card-row">
            <small>cvv</small>
            <strong>{cvv}</strong>
          </div>
          <div className="details-card-row">
            <small>Expiry date</small>
            <strong>{expiry}</strong>
          </div>
          <div className="details-card-row">
            <small>Billing address</small>
            <strong>{billing}</strong>
          </div>
          <div className="details-card-row">
            <small>Zip code</small>
            <strong>{zipcode}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
