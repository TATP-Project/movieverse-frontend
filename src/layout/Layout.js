import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <nav>
                <Link to="/" className="btn btn-primary">
                    Home
                </Link>
            </nav>
            <Outlet />
        </div>
    );
}
