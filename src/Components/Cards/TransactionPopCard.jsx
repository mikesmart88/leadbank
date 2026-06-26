import React from "react";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import CustomImage from "../Images/CustomImage";

import icon from '../../assets/images/leadbank-icon.png'

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function TransactionPopCard({
    isopen,
  onclose,
  amount,
  date,
  account,
  code,
  type,
  currency,
  description,
  status,
  className,
  style,
  id,
  ...props
}) {
  if (!isopen) return null;

  return (
    <section className="verification-overlay card-overlay">
      <div style={style} className={`${className}`} {...props}>
        <CustomButton onClick={onclose} className="close-details">
          <Icon name="IoClose" />
        </CustomButton>
        <div className="transaction-header">
          <h3>Transaction Details</h3>
        </div>
        <div className="transaction-details">
            <div className="details-tab">
                <CustomImage source={icon} />
            <strong>{code}{(amount.toFixed(2)).toLocaleString()}</strong>
            <b>Leadbank</b>
            <small>{date}</small>
            </div>
            <div className="details-row-holder">
                <div className="drow">
                    <small>status</small>
                    <small className={status}>{status}</small>
                </div>
                {/* <div className="drow">
                    <small>Account</small>
                    <small>{account}</small>
                </div> */}
                <div className="drow">
                    <small>Currency</small>
                    <small>{currency}</small>
                </div>
                <div className="drow">
                    <small>Source</small>
                    <small>{type}</small>
                </div>
                <div className="drow">
                    <small>Description</small>
                    <small>{description}</small>
                </div>
                <div className="drow">
                    <small>Reffrence</small>
                    <small>#{id}</small>
                </div>
            </div>

            <CustomButton>
                Download receipt
            </CustomButton>
        </div>
      </div>
    </section>
  );
}
