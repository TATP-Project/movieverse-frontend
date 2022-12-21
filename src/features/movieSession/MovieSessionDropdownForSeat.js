import React from "react";
import { Row, Col } from "antd";
import "./MovieSessionDropdown.css";

export default function MovieSessionDropdownForSeat({ text, onClick, icon }) {
  const handleClick = () => {
    onClick && onClick();
  };
  return (
    <Row
      className="dropdownBox dropdownBoxItem"
      justify="space-between"
      onClick={handleClick}
    >
      <Col className="dropdownBoxText">{text}</Col>
      <Col className="dropdownBoxText">{icon}</Col>
    </Row>
  );
}
