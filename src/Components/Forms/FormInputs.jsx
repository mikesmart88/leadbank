import { useTranslation } from "../../auto-il8n";
import React from "react";
import Input from "../Inputs/Input";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function FormInput({
  style,
  className,
  labelText,
  name,
  type,
  placeholder,
  defaultValue,
  onchange,
  required,
  readonly,
  pattern,
  ...props
}) {
  const {
    t
  } = useTranslation();
  return <div style={style} className={className} {...props}>
      <label htmlFor={name}>{labelText}</label>
      <Input id={name} name={name} type={type} pattern={pattern} placeholder={placeholder} value={defaultValue} onChange={onchange} {...required ? {
      required: true
    } : {}} {...readonly ? {
      readOnly: true
    } : {}} />
    </div>;
}