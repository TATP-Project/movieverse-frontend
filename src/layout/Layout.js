import React from "react";
import { Outlet } from "react-router-dom";
import { Row, Col } from "antd";
import "./Layout.css";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <Row className={"body"} justify="center">
        <Col>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}
