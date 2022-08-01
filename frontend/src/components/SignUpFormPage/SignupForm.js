import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const newErrors = [];

    if (email.length <= 0) {
      newErrors.push("Email is required")
    }
    if (username.length <= 0) {
      newErrors.push("Username is required")
    }
    if (password.length <= 0) {
      newErrors.push("Password is required")
    }
    if (confirmPassword.length <= 0) {
      newErrors.push("Confirm password is required")
    }
    if (firstName.length <= 0) {
      newErrors.push("First name is required")
    }
    if (lastName.length <= 0) {
      newErrors.push("Last name is required")
    }
    if (password !== confirmPassword) {
      newErrors.push("Password and confirm password must match")
    }

    if (newErrors.length) {
      setErrors(newErrors)
    } else {

    }
  }, [email, username, password, confirmPassword, firstName, lastName])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-form-modal">
      <h2>Sign Up</h2>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.length > 0 && (
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>)}
          <button className="submit-signup-button" type="submit">Sign Up</button>
        </form>
    </div>
  );
}

export default SignupForm;
