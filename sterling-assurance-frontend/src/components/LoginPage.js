import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import { notify, notifyError, notifySuccess } from "../notification/Tostify";
import { baseURL, baseURLFE } from "../api/api";
import axios from "axios";
import logo from "../assets/logo.svg";
import "../styles/loginpage.css";

export const LoginPage = () => {
  const loginRef = useRef();
  const navigate = useNavigate();

  const [logInDetails, setlogInDetails] = useState({
    email: "",
    password: "",
  });

  // state for checking errors and if isLogged
  const [isLogged, setIsLogged] = useState(false);
  const [isError, setIsError] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // function to handle logInDetails changes
  const handleChanges = (e) => {
    e.preventDefault();
    setlogInDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const localLogin = () => {
    setIsLoading('Loading...')
    axios
      .post(`${baseURL}/api/v1/login`, logInDetails)
      .then((res) => {
        console.log(res.data.payload.token);
        console.log(res.data);
        // loginRef = loginRef.current.reset();
        localStorage.setItem("token", res.data.payload.token);
        localStorage.setItem("role", res.data.payload.role);
        notifySuccess("Login suceessful");
        navigate("/claims");
        // window.location.href = `${baseURLFE}/hrm/dashboard`;
        displayLoginNotification();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
        if (err.message === "Network Error") {
          notifyError("Network Error");
        } else {
          notifyError(err.response.data.message);
          setResponseStatus(err.response.data.message);
          setIsLoading(false);
        }
      });
  };

  // login sucesssfull message
  const displayLoginNotification = () => {
    toast.success("LoggedIn Successful");
  };

  // function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("testing login");
    localLogin(logInDetails);
  };

  return (
    <div className="login__container">
      <div className="login__col__left">
        <div className="login__left">
          <div className="login__left__image">
            <img src={logo} alt="company-logo" />
          </div>
        </div>
      </div>

      <div className="login__col__right">
        <form className="login__right" onSubmit={handleSubmit}>
          <div className="messages">
            <ToastContainer />
          </div>
          <h1 className="login__header__text">Welcome back!</h1>
          <div className="social__socials">{/* <SocialLogin /> */}</div>
          <div className="horizontal">{/* <span>or</span> */}</div>
          <div className="login__input__container">
            <label htmlFor="email" />
            <input
              type="email"
              name="email"
              value={logInDetails.email}
              placeholder="Email address"
              className="login__input"
              onChange={handleChanges}
              required
            />
            <label htmlFor="password" />
            <input
              type="password"
              name="password"
              value={logInDetails.password}
              placeholder="Password"
              className="login__input"
              onChange={handleChanges}
              required
            />
          </div>
          <div className="login__btn__container">
            <button className="login__btn" onClick={notify}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
