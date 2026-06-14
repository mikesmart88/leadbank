import React from "react";
import Icon from "../Icons/Icon";
import CustomButton from "../Buttons/CustomButtons";
import CustomImage from "../Images/CustomImage";
import ReactCountryFlag from "react-country-flag";
import { getCountryCode } from "../../helpers/getCountryCode";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function AccountCard({
  style,
  className,
  country,
  currencyName,
  currencyIcon,
  balance,
  accountNumber,
  ...props
}) {
  const maskNumber = (number) => {
    const str = number.toString();
    return "••••" + str.slice(-4);
  };

  return (
    <div style={style} className={className} {...props}>
      <span>
        <ReactCountryFlag
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            minHeight: "30px",
          }}
          countryCode={getCountryCode(country)}
          svg
        />
      </span>
      {accountNumber ? (
        <span className="floating-number">
        {maskNumber(accountNumber)}
      </span>
      ): {}}
      <div className="balance-card-show">
        <small>{currencyName}</small>
        <strong>
          {currencyIcon}
          {balance.toLocaleString()}
        </strong>
      </div>
    </div>
  );
}
