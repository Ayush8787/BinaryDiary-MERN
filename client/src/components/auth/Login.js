import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email,password);
   
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

 
  return (
    <Fragment>
        <div className="login-div dothat">
            
       
      <h1 className="large text-primary dothat">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <div className="field">
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="rr"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
           className="rr"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary signin-button" value="Login" />
      </form>
      </div>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);