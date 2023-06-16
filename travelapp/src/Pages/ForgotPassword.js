import React, { useState, useEffect } from "react";
import Apis, { endpoints } from "../Apis";
import { CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../images/lg.jpg";

export default function ForgotPassword() {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [confirm, setConfirm] = useState([]);
  const [email, setEmail] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const forget_action = (e) => {
    e.preventDefault();
    setLoading(true);
    let res_forget = () => {
      try {
        const formdata = new FormData();
        formdata.append("username", username);
        formdata.append("new_password", password);
        formdata.append("confirm_password", confirm);
        formdata.append("email", email);
        Apis.post(endpoints["forgot_password"], formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Change Password Success", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 3000);
      } catch (er) {
        console.error(er);
        setLoading(false);
        toast("Failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    if (password === confirm && password !== null) {
      res_forget();
    } else {
      setLoading(false);
      toast("Failed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div
      className="login-section"
      style={{ backgroundImage: `url(${loginImage})`, height: "800px" }}
    >
      <ToastContainer />

      <section className="login-form-section">
        <div className="container">
          {loading && <CircularProgress style={{ left: "50%" }} />}
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 style={{ color: "white" }} className="heading-section">
                Forgot Password
              </h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <form class="signin-form" onSubmit={forget_action}>
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
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
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
                  <div className="form-group">
                    <input
                      id="confirm-password-field"
                      type="password"
                      onChange={(e) => setConfirm(e.target.value)}
                      className="form-control"
                      placeholder="Re-Password"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary submit px-3"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div className="register d-flex text-center">
                  <button className="register-btn">
                    <Link to="/register">Create an account</Link>
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
