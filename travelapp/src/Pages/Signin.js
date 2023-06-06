import React, { useState, useEffect } from "react";
import Apis, { endpoints } from "../Apis";
import axios from "axios";
import LoginUser from "../Actions/Creator";
import { useDispatch } from "react-redux";
import cookies from "react-cookies";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import loginImage from '../images/lg.jpg';

export default function Signin() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [flat, setFlat] = useState(false);

  useEffect(() => {
    console.info("Test");
  });

  const login = async (event) => {
    event.preventDefault();

    try {
      let info = await Apis.get(endpoints["oauth2-info"]);
      const formdata = new FormData();
      formdata.append("client_id", info.data.client_id);
      formdata.append("client_secret", info.data.client_secret);
      formdata.append("username", username);
      formdata.append("password", password);
      formdata.append("grant_type", "password");

      const res = await axios({
        method: "post",
        url: "https://etravel12.pythonanywhere.com/o/token/",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);

      cookies.save("access_token", res.data.access_token);
      console.log("access", res.data.access_token);
      let user = await Apis.get(endpoints["current_user"], {
        headers: {
          Authorization: `Bearer ${cookies.load("access_token")}`,
        },
      });

      cookies.save("user", user.data);
      dispatch(LoginUser(user.data));
      console.log(user.data);
      console.info(user);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.warn("Something was wrong!!!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="login-section" style={{backgroundImage: `url(${loginImage})` , height: '800px'}}>
      <ToastContainer />

      <div>
        <form onSubmit={login}>
          <input
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <section className="login-form-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 style={{color: 'white'}} className="heading-section">Login</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Have an account?</h3>
                <form action="#" class="signin-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="password-field"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <span
                      toggle="#password-field"
                      className="fa fa-fw fa-eye field-icon toggle-password"
                    ></span>
                  </div>
                  <div class="form-group">
                    <button
                      type="submit"
                      class="form-control btn btn-primary submit px-3"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-50">
                      <label className="checkbox-wrap checkbox-primary">
                        Remember Me
                        <input type="checkbox" checked />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="w-50 text-md-right">
                      <a href="#" style={{ color: "white" }}>
                        Forgot Password
                      </a>
                    </div>
                  </div>
                </form>
                <p className="w-100 text-center">
                  &mdash; Or Sign In With &mdash;
                </p>
                <div className="social d-flex text-center">
                  <a href="/" className="px-2 py-2 mr-md-1 rounded" style={{marginRight:'1rem'}}>
                    <span className="ion-logo-facebook mr-2"></span> Facebook
                  </a>
                  <a href="/" className="px-2 py-2 ml-md-1 rounded" style={{marginLeft:'1rem'}}>
                    <span className="ion-logo-twitter mr-2"></span> Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
