import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Header from "./Header";

export default function Layout() {
    return (
        <div>
            <Header />
            <div className={"body"}>
                <Outlet />
            </div>
        </div>
    );
}
