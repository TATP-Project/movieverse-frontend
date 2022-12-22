import React from "react";
import { RightOutlined } from "@ant-design/icons";
import "./ConfirmButton.css";

export default function confirmSeatButton({ onClick, disabled }) {
  return (
    <button
      className={`confirmButton ${disabled ? "disabledConfirmButton" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="buttonText">Confirm</span>
      <span className={`buttonIcon ${disabled ? "disabledButtonIcon" : ""}`}>
        <RightOutlined />
      </span>
    </button>
  );
}
