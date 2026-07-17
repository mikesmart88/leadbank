import { useTranslation } from "../../auto-il8n";
import React from "react";
import Input from "../Inputs/Input";
import Select from "../Selects/Select";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function TopUpFormInput({
  style,
  className,
  labelText,
  name,
  type,
  placeholder,
  defaultValue,
  svalue,
  onchange,
  required,
  readonly,
  pattern,
  option,
  onchangeS,
  balance,
  ...props
}) {
  const {
    t
  } = useTranslation();
  return <div style={style} className={className} {...props}>
      <label htmlFor={name}>{labelText}</label>
      <div className="input-select-holder">
        <div>
          <Select placeholder="select country" options={option} value={svalue} className="top-select" onchange={onchangeS} />
          <small>{t("bal")}{balance}</small>
        </div>
        <Input type={type} onChange={onchange} placeholder={placeholder} value={defaultValue} name={name} required />
      </div>
    </div>;
}