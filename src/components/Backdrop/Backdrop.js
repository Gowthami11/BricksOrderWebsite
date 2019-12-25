import React from "react";

export default function Backdrop(props) {
  return props.show ? (
    <div
      style={{
        top: "0px",
        left: "0px",
        backgroundColor: "rgba(7,7,7,0.4)",
        zIndex: "500",
        width: "100%",
        height: "700px",
        position: "fixed"
      }}
      onClick={props.setShow}
    ></div>
  ) : null;
}
