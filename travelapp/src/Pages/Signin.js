import React, { useState, useEffect } from "react";
import Apis, { endpoints } from "../Apis";
import LoginUser from "../Actions/Creator";
import { useDispatch } from "react-redux";
import cookies from "react-cookies";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const history = useNavigate();

  const [flat, setFlat] = useState(false);

  useEffect(() => {
    console.info("Test");
  });

  const login = async (event) => {
    event.preventDefault();

    try {
      let info = await Apis.get(endpoints["oauth2-info"]);
      console.log(info);
      let res = await Apis.post(endpoints["login"], {
        client_id: info.data.client_id,
        client_secret: info.data.client_secret,
        username: username,
        password: password,
        grant_type: "password",
      });
      console.log(res.data);

      console.info(user);

      cookies.save("access_token", res.data.access_token);
      let user = await Apis.get(endpoints["current_user"], {
        headers: {
          Authorization: `Bearer ${cookies.load("access_token")}`,
        },
      });

      cookies.save("user", user.data);
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

      <div>
      <form onSubmit={login}>
            <input
              value={username}
              type="text"
              onChange={e=>setUsername(e.target.value)}
              placeholder="Enter username"
            />
            <input
            
              type="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <button type="submit">
              Submit
            </button>
      </form>
    </div>
    </div>
  );
}
