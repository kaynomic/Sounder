import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './SignUpForm.css';
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
  <>
    <div className="create-account-head">
      <h2>Create an Account</h2>
    </div>

    <form onSubmit={handleSubmit} className="signup-form">
      <ul>
        {errors.map((error, i) => <li key={i}>{error}</li>)}
      </ul>
      <label className="first">
        First Name
        <input
          type="text"
          value={fName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label className="last">
        Last Name
        <input
          type="text"
          value={lName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label className="e-mail">
        Email
        <input
          type="text"
          className='e-mail-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="user-name">
        Username
        <input
          type="text"
          className='username-input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label className="pass-word">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className="confirm-pw">
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="sign-up-button">Sign Up</button>
    </form>
  </>
  );
}

export default SignupFormPage;
