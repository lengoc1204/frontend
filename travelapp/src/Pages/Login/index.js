import React, { useState, useEffect } from "react";
import Apis, { endpoints } from "../../Apis";
import LoginUser from "../../Actions/Creator";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import cookie from "react-cookies";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const history = useNavigate();

  const [flat, setFlat] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    try {
      let info = await Apis.get(endpoints["oauth2-info"]);
      let res = await Apis.post(endpoints["login"], {
        client_id: info.data.client_id,
        client_secret: info.data.client_secret,
        username: username,
        password: password,
        grant_type: "password",
      });
      cookie.save("access_token", res.data.access_token);
      let user = await Apis.get(endpoints["current_user"], {
        headers: {
          Authorization: `Bearer ${cookie.load("access_token")}`,
        },
      });

      cookie.save("user", user.data);
      dispatch(LoginUser(user.data));
      console.log(user.data);
      history.push("/");
    } catch (err) {
      console.error(err);
      toast.warn("Hình Như sai pass òi", {
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
    <div>
      <ToastContainer />
      <div className="container">
      <div className="row justify-content-center">
        <div>
          <div className="wrap d-md-flex">
            <div
              className="img"
              style={{backgroundImage: "url(https://tse2.mm.bing.net/th?id=OIP.guQqku-OOG-M3YqR6nPq7wHaEC&pid=Api&P=0&h=180)"}}
            ></div>
            <div className="login-wrap p-4 p-md-5">
              <div className="d-flex">
                <div className="w-100">
                  <h3 className="mb-4">Sign In</h3>
                </div>
                <div className="w-100">
                  <p className="social-media d-flex justify-content-end">
                    <a
                      href="#"
                      className="social-icon d-flex align-items-center justify-content-center"
                    >
                      <span className="fa fa-facebook"></span>
                    </a>
                    <a
                      href="#"
                      className="social-icon d-flex align-items-center justify-content-center"
                    >
                      <span className="fa fa-twitter"></span>
                    </a>
                  </p>
                </div>
              </div>
              <form action="#" className="signin-form">
                <div className="form-group mb-3">
                  <label className="label" htmlFor="name">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="form-control btn btn-primary rounded submit px-3"
                  >
                    Sign In
                  </button>
                </div>
                <div className="form-group d-md-flex">
                  <div className="w-50 text-left">
                    <label className="checkbox-wrap checkbox-primary mb-0">
                      Remember Me
                      <input type="checkbox" checked />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="w-50 text-md-right">
                    <a href="#">Forgot Password</a>
                  </div>
                </div>
              </form>
              <p className="text-center">
                Not a member?{" "}
                <a data-toggle="tab" href="#signup">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
