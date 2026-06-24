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
          <h2>Account Details</h2>
        </span>
        <div className="detail-card-body">
          <div className="details-card-row">
            <small>Bank name</small>
            <strong>Lead Community Bank</strong>
          </div>
          <div className="details-card-row">
            <small>Accoun name</small>
            <strong>{name}</strong>
          </div>
          <div className="details-card-row">
            <small>Account number</small>
            <strong>{number}</strong>
          </div>
          <div className="details-card-row">
            <small>Balance</small>
            <strong>{balance}</strong>
          </div>
          <div className="details-card-row">
            <small>Country/region</small>
            <strong>{country}</strong>
          </div>
          <div className="details-card-row">
            <small>Created date</small>
            <strong>{date}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
