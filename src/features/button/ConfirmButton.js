import React from "react";
import { RightOutlined } from "@ant-design/icons";
import "./ConfirmButton.css";

export default function confirmSeatButton({ onClick }) {
  return (
    <button className="confirmButton" onClick={onClick}>
      <span className="buttonText">Confirm</span>
      <span className="buttonIcon">
        <RightOutlined />
      </span>
    </button>
  );
}
