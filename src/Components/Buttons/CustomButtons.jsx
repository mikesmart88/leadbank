import React from 'react';
/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns 
 */


export default function CustomButton({
  children,
  type,
  loading = false,
  disabled = false,
  style,
  className,
  ...props
}) {
  return (
    <button
      className={`Button ${className} ${disabled ? "disabled" : ''}`}
      type={type}
      disabled={disabled || loading}
      style={{ ...style }}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
