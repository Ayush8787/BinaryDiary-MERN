import React from 'react';
import {Link} from "react-router-dom"


const Landing = () => {
    return (
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large" >Binary Diary</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other techies of the world!
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary signin-button1">Sign Up</Link>
            <Link to="/login" className="btn btn-light signin-button1">Login</Link>
          </div>
        </div>
      </div>
    </section>
    )
}
export default Landing
