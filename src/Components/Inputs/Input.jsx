import { useTranslation } from "../../auto-il8n";
import React, { useState } from "react";
import Icon from "../Icons/Icon";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function Input({
  type = "text",
  error,
  ...props
}) {
  const {
    t
  } = useTranslation();
  const [showPassword, setShowPassword] = useState(false); // 👈 hidden by default
  const isPassword = type === "password";
  return <div style={{
    position: "relative",
    width: "100%"
  }} className="input-holder">
      <input className={`input ${error ? "error" : ""}`} type={isPassword && showPassword ? "text" : type} style={{
      paddingRight: isPassword ? "40px" : undefined,
      border: "none",
      outline: "none",
      width: "100%",
      boxSizing: "border-box"
    }} {...props} />

      {isPassword && <button type="button" onClick={() => setShowPassword(prev => !prev)} style={{
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "inherit"
    }} aria-label={showPassword ? "Hide password" : "Show password"}>
          {showPassword ? <Icon name="IoEyeOff" style={{
        width: "24px",
        height: "24px"
      }} /> : <Icon name="IoEye" style={{
        width: "24px",
        height: "24px"
      }} />}
        </button>}
    </div>;
}