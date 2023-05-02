import "../styles/homepage.css";
import logo from "../assets/logo.svg";
import headerImage from "../assets/header_bg.svg";
import { data } from "./data";
import { Link, NavLink } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="homepage">
      <nav>
        <div className="logo__div">
          <img className="logo" src={logo} alt="company-logo" />
          <p>STERLING ASSURANCE</p>
        </div>
        <ul>
          <li>HOME</li>
          <li>ABOUT US</li>
          <li>PRODUCTS</li>
          <li>INVESTORS</li>
          <li>INSURANCE</li>
          <li>CLAIMS</li>
          <li>DOWNLOADS</li>
          <NavLink className='login-link' to="login">
            <li>LOGIN</li>
          </NavLink>
          <li>CONTACT</li>
        </ul>
      </nav>
      <div className="header__section">
        <img
          src={headerImage}
          alt="header-background"
          className="header__image"
        />
      </div>
      <div className="claims__container">
        {data.map((item) => {
          return (
            <div key={item.id} className="claim">
              <img src={item.image} alt="" />
              <p className="claim__title">{item.title}</p>
              <p className="claim__desc">{item.description}</p>
              <div className="button__div">
                <Link to="login">
                  <button className="claim-btn">Claim</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
