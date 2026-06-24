import Icon from "../Icons/Icon";
import React from "react";
import CustomButton from "../Buttons/CustomButtons";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function ConfamationAlert({
  titleText,
  style,
  className,
  information,
  closeText,
  onClose,
  confirmText,
  Callback,
  ...props
}) {
  return (
    <section className="verification-overlay card-overlay">
      <div style={style} className={className}>
        <h2>{titleText}</h2>
        <p>{information}</p>
        <div className="confarmation-btn-holder">
          {closeText && (
            <CustomButton onClick={onClose}>{closeText}</CustomButton>
          )}
          <CustomButton onClick={Callback}>{confirmText}</CustomButton>
        </div>
      </div>
    </section>
  );
}
