import React,{Fragment,useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from "../../actions/alert";
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

 const Register = ({setAlert,register,isAuthenticated}) => {

  const [formData, setFormData] = useState({
    name : "",
    email: "",
password : "",
password2 : ""

  });
  const { name,email,password,password2} = formData;
  
  const onchange = (e) => {
      setFormData({...formData, [e.target.name] : e.target.value})
    }
 const onSubmit = (e) => {
     e.preventDefault();
     if (password !== password2) {
       console.log("herere")
      setAlert('Passwords do not match', 'danger');
    } else {
      register({name,email,password});
    }

  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }



    return (
        <Fragment>
            <div className="login-div dothat">
            
            <h1 className="large text-primary dothat">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text"  className="rr" placeholder="Name" name="name" value={name} onChange={e => onchange(e)}  />
        </div>
        <div className="form-group">
          <input type="email"  className="rr" placeholder="Email Address" value={email} onChange={e => onchange(e)} name="email" />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
           className="rr"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onchange(e)}
            
          />
        </div>
        <div className="form-group">
          <input
           className="rr"
            type="password"
            value= {password2}
            placeholder="Confirm Password"
            name="password2"
            onChange={e => onchange(e)}
            
          />
        </div>
        <input type="submit" className="btn btn-primary signin-button" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      </div>
        </Fragment>
    )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setAlert,register })(Register);