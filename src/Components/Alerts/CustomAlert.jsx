import Icon from "../Icons/Icon";
import { useEffect, useState } from "react";

export default function CustomAlert({
  type,
  message,
  onClose,
  duration = 5000,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // allow first paint, then animate
    const t = setTimeout(() => setOpen(true), 10);
    const closeTimer = setTimeout(() => {
      setClosing(true);
      setOpen(false);
    }, duration);

    // remove from DOM after animation ends
    const removeTimer = setTimeout(() => {
      onClose?.();
    }, duration + 600); // match CSS transition

    return () => {
      clearTimeout(t);
      clearTimeout(closeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  return (
    <div className={`Alert-box`}>
      <span
        className={`main-box ${type} ${open ? "open" : ""} ${
          closing ? "closing" : ""
        }`}
        {...props}
      >
        <Icon name="LuInfo" /> <p>{message}</p>
      </span>
    </div>
  );
}
