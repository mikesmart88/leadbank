import React, { useState, useRef, useEffect } from "react";
import Icon from "../Icons/Icon";
import Input from "../Inputs/Input";
/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns
 */

export default function Select({
  style,
  className,
  value,
  readonly,
  required,
  placeholder,
  onchange,
  disabled,
  name,
  options,
  ...props
}) {
  const [nullvalue, setNullValue] = useState("");
  const [dropvisible, setDropVisible] = useState(false);
  const [dropHeight, setDropHeight] = useState(0);

  const childRef = useRef(null);

  useEffect(() => {
     if (childRef.current) {
    console.log(childRef.current.offsetHeight);
    setDropHeight(childRef.current.offsetHeight);
  }
  }, [dropvisible]);

  const handleChioce = (chioceValue) => {
    setNullValue(chioceValue);
    setDropVisible(false);
    setDropHeight(0);

     onchange?.({
        target: {
            name,
            value: chioceValue
        }
    });
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: `${dropHeight + 5}px`,
        ...style,
      }}
      className={`select ${className}`}
      {...props}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Input
          type="text"
          placeholder={placeholder}
          value={nullvalue === "" ? (value ?? "") : nullvalue}
          {...(required ? { required: true } : {})}
          readOnly
          onChange={onchange}
          name={name}
          id={name}
        />
        <Icon
          name="LuChevronDown"
          style={{
            position: "absolute",
            right: "20px",
            transition: ".5s all linear",
            cursor: "pointer",
          }}
          onClick={()=> {disabled == true ? setDropVisible(false) : setDropVisible(true)}}
        />
      </div>
      {dropvisible && (
        <div
          ref={childRef}
          className="slect-dropdown"
          style={{
            width: "95%",
            height: "fit-content",
            position: "absolute",
            overflowX: "hidden",
            boxSizing: "border-box",
            top: "1%",
            boxShadow: "0px 0px 5px #c2c1c19d",
            margin: "auto auto",
            borderRadius: "10px",
            maxHeight: "400px",
            zIndex: "200",
            background: "white",
          }}
        >
          {options.map((option, index) => (
            <small
              key={index}
              style={{
                fontSize: "13px",
                color: "#605e5e",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                width: "100%",
                padding: "12px",
                boxSizing: "border-box",
              }}
              className="option"
              onPointerDown={(e) => {
                e.target.style.backgroundColor = "#c2c1c19d"
              }}
              onClick={() => handleChioce(option.value)}
              onPointerUp={(e) => {
                e.target.style.backgroundColor = "white";
              }}
              onPointerLeave={(e) => {
                e.target.style.backgroundColor = "white";
              }}
            >
              {option.display}
            </small>
          ))}
        </div>
      )}
    </div>
  );
}
