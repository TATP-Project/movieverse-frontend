import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";
import { Button } from "antd";
import { ReactComponent as MovieLanguageLogo } from "../icons/Language.svg";
import { ReactComponent as LocationLogo } from "../icons/Location.svg";
import { ReactComponent as Logo } from "../icons/Logo.svg";
import { useNavigate } from "react-router-dom";


export default function Header() {
    const navigate = useNavigate()
    return (
        <div className={"header"}>
            <div></div>
            <div className={"centerDiv"}>
                <Link to="/"  onClick={()=>{navigate('/');navigate(0);}}>
                    <Logo />
                </Link>
            </div>
            <div className={"rightDiv"}>
                <span>
                    <LocationLogo className={"logo"} />
                    <span>Nur-Sultan</span>
                </span>
                <span>
                    <MovieLanguageLogo className={"logo"} />
                    <span>Eng</span>
                </span>
                <Button type="primary" className={"button"}>
                    Profile
                </Button>
            </div>
        </div>
    );
}
