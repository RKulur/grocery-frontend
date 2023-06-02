// User Form
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./UserForm.css";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function UserForm(props) {
  const { active } = props;
  const loginEmail = useRef(null);
  const loginPassword = useRef(null);

  const regName = useRef(null);
  const regPhone = useRef(null);
  const regAddress = useRef(null);
  const regPinCode = useRef(null);
  const regEmail = useRef(null);
  const regPassword = useRef(null);

  const [activeCreateUser, setActiveCreateUser] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    Axios.post("http://localhost:7000/api/user/login", {
      email: loginEmail.current?.value,
      password: loginPassword.current?.value,
    })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.authToken));
      })
      .catch((err) => console.log(err));
  }

  function handleCreateUserSubmit(e) {
    e.preventDefault();

    const name = regName.current?.value;
    const phone = regPhone.current?.value;
    const address = regAddress.current?.value;
    const pinCode = regPinCode.current?.value;
    const email = regEmail.current?.value;
    const password = regPassword.current?.value;
    console.log({ name, phone, address, pinCode, email, password });
    Axios.post("http://localhost:7000/api/user/register", {
      name,
      phone,
      address,
      pinCode,
      email,
      password,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {!activeCreateUser ? (
        <form
          className={`user-form ${active ? "active" : ""}`}
          onSubmit={handleSubmit}
        >
          <h3>login now</h3>
          <div className="box">
            <input
              ref={loginEmail}
              name="email"
              type="email"
              placeholder="your email"
            />
          </div>
          <div className="box">
            <input
              ref={loginPassword}
              name="password"
              type="password"
              placeholder="your password"
            />
          </div>
          <p>
            forgot your password <a href="/">click here</a>
          </p>
          <p>
            don&apos;t have an account{" "}
            <Link
              onClick={() => {
                setActiveCreateUser(true);
              }}
              to="/"
            >
              create now
            </Link>
          </p>
          <button type="submit" className="btn">
            login now
          </button>
        </form>
      ) : (
        <form
          className={`user-form ${active ? "active" : ""}`}
          onSubmit={handleCreateUserSubmit}
        >
          <h3>Register</h3>
          <div className="box">
            <input
              ref={regName}
              name="name"
              type="text"
              placeholder="Enter name"
            />
          </div>
          <div className="box">
            <input
              ref={regPhone}
              name="phone"
              type="text"
              placeholder="Enter phone number"
            />
          </div>
          <div className="box">
            <input
              ref={regAddress}
              name="address"
              type="text"
              placeholder="Enter address"
            />
          </div>
          <div className="box">
            <input
              ref={regPinCode}
              name="pinCode"
              type="text"
              placeholder="Enter pin-code"
            />
          </div>
          <div className="box">
            <input
              ref={regEmail}
              name="email"
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div className="box">
            <input
              ref={regPassword}
              name="password"
              type="text"
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      )}
    </>
  );
}
UserForm.propTypes = {
  active: PropTypes.bool,
}.isRequired;
