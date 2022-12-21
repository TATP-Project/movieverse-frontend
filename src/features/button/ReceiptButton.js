import React from "react";
import ReceiptIcon from "../../icons/ReceiptLogo.png";
import "./ConfirmButton.css";
import "./ReceiptButton.css";

export default function downloadReceiptButton({ onClick }) {
  return (
    <button className="confirmButton" onClick={onClick}>
      <span id="receiptButton" className="buttonText">Receipt</span>
      <span className="buttonIcon">
        <img src={ReceiptIcon} alt="V"/>
      </span>
    </button>
  );
}
