import { useRef, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Apis, { endpoints } from "../Apis";
import { toast, ToastContainer } from "react-toastify";
import loginImage from '../images/lg.jpg';

export default function Register() {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [confirm, setConfirm] = useState([]);
  const [email, setEmail] = useState([]);

  const [first_name, setFirst_name] = useState([]);
  const [last_name, setLast_name] = useState([]);
  const avatar = useRef()

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();
    if (password === confirm && password !== null) {
      const formdata = new FormData();
      formdata.append("first_name", first_name);
      formdata.append("last_name", last_name);
      formdata.append("email", email);
      formdata.append("username", username);
      formdata.append("password", password);
      if(password === confirm){
      try {
        let res = await Apis.post(endpoints["register"], formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        navigate("/login");
      } catch (er) {
        console.error(er);
        toast.warning("Có lỗi rùi!", {
          position: "top-bottom",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      document.getElementById("");
    }}else{
      setErr("Passwords must match")
    }
  };

  return (
    <div className="login-section" style={{backgroundImage: `url(${loginImage})` , height: '800px'}} >
      <ToastContainer />

      <section className="login-form-section">
        <div className="container">
          <div className="row justify-content-center" style={{padding:'50px'}}>
            <div className="col-md-8 text-center mb-6">
              <h2 style={{ color: "white" }} className="heading-section">
                Register
              </h2>
            </div>
          </div>
          
          <Row className="justify-content-center">
          <Col  className="col-md-8 col-lg-6">
          <form className="signin-form" onSubmit={register} style={{height:'500px'}}>
                  <div className="form-group">
                    <Row>
                        
                        <Col style={{paddingLeft: '0px'}} sm={4}><input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                        </Col><Col style={{paddingRight: '0px'}} sm={8}>
                            <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                        </Col>
                    </Row>
                    </div>
                    <div className="form-group"><input
                      type="text"
                      className="form-control"
                      placeholder="Firstname"
                      onChange={(e) => setFirst_name(e.target.value)}
                      required
                    /></div><div className="form-group"><input
                      type="text"
                      className="form-control"
                      placeholder="Lastname"
                      onChange={(e) => setLast_name(e.target.value)}
                      required
                    /></div>
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
                      placeholder="Confirm Password"
                      required />
                      {err !== null ? <div>{err}</div> : null}
                  </div>
                  <div class="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary submit px-3"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
          </Col>
          </Row>
        </div>
      </section>
    </div>
  );
}
