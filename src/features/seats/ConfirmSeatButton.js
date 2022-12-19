import React from "react";
import { RightOutlined } from "@ant-design/icons";
import "./ConfirmSeatButton.css";

export default function confirmSeatButton({ onClick }) {
  return (
    <button className="button" onClick={onClick}>
      <span className="buttonText">Confirm</span>
      <span className="buttonIcon">
        <RightOutlined />
      </span>
    </button>
  );
}
