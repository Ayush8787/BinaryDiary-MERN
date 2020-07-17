import axios from "axios"
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
  NO_REPOS
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
	  console.log("herererrerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    const res = await axios.get('api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post('/api/profile', formData, config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		dispatch(
			setAlert(edit ? 'Profile Updated' : 'Profile created', 'success')
		);

		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		console.log('reaching catch');
		const errors = err.response.data.errors;

		if (errors) {
      console.log(errors)
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger ')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};