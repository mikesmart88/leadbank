import { useTranslation } from "../../auto-il8n";
import React from "react";
import Select from "../Selects/Select";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function FormSelect({
  style,
  className,
  labelText,
  name,
  placeholder,
  defaultValue,
  onchange,
  disabled,
  required,
  options,
  ...props
}) {
  const {
    t
  } = useTranslation();
  return <div style={style} className={className} {...props}>
      <label htmlFor={name}>{labelText}</label>
      <Select id={name} name={name} value={defaultValue} onchange={onchange} placeholder={placeholder} {...disabled ? {
      disabled: true
    } : {}} {...required ? {
      required: true
    } : {}} options={options} />
    </div>;
}