// User Form
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./UserForm.css";
import Axios from "axios";

export default function UserForm(props) {
  const { active } = props;
  const email = useRef(null);
  const password = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    Axios.post("http://localhost:7000/api/user/login", { email: email.current?.value, password: password.current?.value })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.authToken));
      })
      .catch(err => console.log(err));
  }

  return (
    <form
      className={`user-form ${active ? "active" : ""}`}
      onSubmit={handleSubmit}
    >
      <h3>login now</h3>
      <div className="box">
        <input ref={email} name="email" type="email" placeholder="your email" />
      </div>
      <div className="box">
        <input
          ref={password}
          name="password"
          type="password"
          placeholder="your password"
        />
      </div>
      <p>
        forgot your password <a href="/">click here</a>
      </p>
      <p>
        don&apos;t have an account <a href="/">create now</a>
      </p>
      <button type="submit" className="btn">
        login now
      </button>
    </form>
  );
}
UserForm.propTypes = {
  active: PropTypes.bool,
}.isRequired;
