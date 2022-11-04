import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/me" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        history.push("/me");
      })
  }

  const demoSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }))
    .then(() => {
      history.push("/me");
    })
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }

  return (
  <>
    <div className='log-in-head'>
      <h2>Welcome Back!</h2>
    </div>
    <form onSubmit={handleSubmit} className="login-form">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className='email'>
        Email
        <input
          type="text"
          placeholder='Email'
          className='email-input'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className='passWord'>
        Password
        <input
          type="password"
          placeholder='Password'
          className='pw-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className='submitButton' onClick={handleLogin}>Sign In</button>
      <button type="submit" className='demo-user' onClick={demoSubmit}>Demo User</button>
    </form>
  </>
  );
}

export default LoginForm;
