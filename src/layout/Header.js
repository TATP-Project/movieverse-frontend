import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";
import { ReactComponent as MovieLanguageLogo } from "../icons/Language.svg";
import { ReactComponent as LocationLogo } from "../icons/Location.svg";
import { ReactComponent as Logo } from "../icons/Logo.svg";
import { useNavigate } from "react-router-dom";
import { cleanCacheAndRedirect } from "../features/button/BackToHomeButton";
import { useDispatch, useSelector } from "react-redux";


export default function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const seatSelection = useSelector((state) => state.seatSelection);
    const history = useSelector((state) => state.history);
    return (
        <div className={"header"}>
            <div></div>
            <div className={"centerDiv"}>
                <Link to="/"  onClick={()=>{cleanCacheAndRedirect(navigate,dispatch,seatSelection,history)}}>
                    <Logo />
                </Link>
            </div>
            <div className={"rightDiv"}>
                <span>
                    <LocationLogo className={"logo"} />
                    <span>Hong Kong</span>
                </span>
                <span>
                    <MovieLanguageLogo className={"logo"} />
                    <span>Eng</span>
                </span>
            </div>
        </div>
    );
}
