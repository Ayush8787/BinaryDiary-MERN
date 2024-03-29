import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardAction';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile } from '../../actions/profile';
import {deleteAccount} from '../../actions/profile'

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  console.log("from dashboard",profile)

  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null &&
      profile.experience !== undefined &&
      profile.education !== undefined ? (
        <Fragment>
          <DashboardActions />
		  <Experience experience={profile.experience} />
		  <Education education={profile.education} />
        

          <div className='my-2'>
            <button className='btn btn-danger deletemargin1' onClick={() => deleteAccount()}>
            <i class="fas fa-user-alt-slash"></i>{" "} Delete My Account
            </button>
          </div> 
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile,deleteAccount })(
  Dashboard
);