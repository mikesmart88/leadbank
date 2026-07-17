import { useTranslation } from "../../auto-il8n";
import * as bsicons from "react-icons/bs";
import * as fcicons from "react-icons/fc";
import * as giicons from "react-icons/gi";
import * as ioicons from "react-icons/io5";
import * as mdicons from "react-icons/md";
import * as luicons from "react-icons/lu";
import React from "react";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns 
 */

export default function Icon({
  name,
  style,
  ...props
}) {
  const {
    t
  } = useTranslation();
  let IconComponent = null;
  if (name.startsWith("Bs")) {
    IconComponent = bsicons[name];
  } else if (name.startsWith("Fc")) {
    IconComponent = fcicons[name];
  } else if (name.startsWith("Gi")) {
    IconComponent = giicons[name];
  } else if (name.startsWith("Io")) {
    IconComponent = ioicons[name];
  } else if (name.startsWith("Md")) {
    IconComponent = mdicons[name];
  } else if (name.startsWith("Lu")) {
    IconComponent = luicons[name];
  }
  if (!IconComponent) {
    return <span>{t("")}</span>; // fallback
  }
  return <IconComponent style={{
    ...style
  }} {...props} />;
}