import React from "react";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import CustomImage from "../Images/CustomImage";
import { useData } from "../../hooks/UseData";

import icon from '../../assets/images/leadbank-icon.png'
import { PDFDownloadLink } from "@react-pdf/renderer";
import { TransactionReceipt } from "../pdfjsx/TransactionPDF";

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

  const { userdata } = useData()

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

            <PDFDownloadLink
              document={<TransactionReceipt transaction={
                {
                  status: status,
                  amount: amount,
                  currency: currency || "",
                  created_at: date,
                  account:  `${userdata?.first_name ?? ""} ${userdata?.last_name ?? ""}`.trim(),
                  type: type,
                  narration: description,
                  reference: id
                }
              } />}
              fileName={`Transaction-${id}.pdf`}
              className="Button"
            >
              {({ loading }) =>
                loading ? "Generating..." : "Download Receipt"
              }
            </PDFDownloadLink>
        </div>
      </div>
    </section>
  );
}
