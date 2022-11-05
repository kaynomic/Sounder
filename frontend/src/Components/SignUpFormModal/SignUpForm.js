import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './SignUpForm.css';
import * as sessionActions from "../../store/session";

function SignUpForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const handleSignUp = e => {
    e.preventDefault();
    return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
    .then(() => {
      history.push("/me");
    })
  }

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
        <input
          type="text"
          placeholder='First Name'
          className='fname-input'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label className="last">
        <input
          type="text"
          placeholder='Last Name'
          className='lname-input'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label className="e-mail">
        <input
          type="text"
          placeholder='Email'
          className='e-mail-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="user-name">
        <input
          type="text"
          placeholder='Username'
          className='username-input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label className="pass-word">
        <input
          type="password"
          placeholder='Password'
          className='sign-pw-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className="confirm-pw">
        <input
          type="password"
          placeholder='Confirm Password'
          className='confirm-input'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="sign-up-button" onClick={handleSignUp}>Sign Up</button>
    </form>
  </>
  );
}

export default SignUpForm;
