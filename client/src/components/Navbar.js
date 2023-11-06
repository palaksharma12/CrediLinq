import React, { Fragment } from "react";
import "../css/Navbar.css";

const Navbar = () => {
    const logoUrl = `${process.env.PUBLIC_URL}/logo.svg`;

    return (
        <Fragment>
            <div className="nav justify-content-between ">
                <img src={logoUrl} alt="Credlinq.AI" />
                <div className="nav-text text-right mt-auto">SME HealthCheck - Get Started</div>
            </div>
        </Fragment>
    )
}

export default Navbar;