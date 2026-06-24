import React from "react";
import Input from "../Inputs/Input";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function FormCheckbox({
  style,
  className,
  labelText,
  name,
  defaultValue,
  onchange,
  required,
  readonly,
  pattern,
  ...props

}) {
    return (
        <label htmlFor={name} style={{display: "flex", ...style}} className={className} {...props}>
            <Input
                    id={name}
                    name={name}
                    type="checkbox"
                    pattern={pattern}
                    value={defaultValue}
                    onChange={onchange}
                    {...(required ? { required: true } : {})}
                    {...(readonly ? { readOnly: true } : {})}
                    style={{accentColor: "#1a202c",}}
                  />
                  <span>
                    {labelText}
                  </span>
        </label>
    )
}