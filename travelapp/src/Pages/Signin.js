import React, { useState, useEffect } from "react";
import Apis, { endpoints } from "../Apis";
import axios from "axios";
import LoginUser from "../Actions/Creator";
import { useDispatch } from "react-redux";
import cookies from "react-cookies";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import loginImage from '../images/lg.jpg';

export default function Signin() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [flat, setFlat] = useState(false);

  // useEffect(() => {
  //   console.info("Test");
  // });

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
                <form class="signin-form" onSubmit={login}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="password-field"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary submit px-3"
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
                      <Link to="/forgot-pasword" style={{ color: "white" }}>
                        Forgot Password
                      </Link>
                    </div>
                  </div>
                </form>
                <div className="register d-flex text-center">
                <button
                      className="register-btn"
                    ><Link to="/register">
                      Create an account</Link>
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
