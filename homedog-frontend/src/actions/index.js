import { adapter } from '../services';

export const fetchUser = () => dispatch => {
  dispatch({ type: 'ASYNC_START' });
  adapter.auth.getCurrentUser().then(user => {
    dispatch({ type: 'SET_CURRENT_USER', user });
  });
};

export const loginUser = (username, password, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });
  adapter.auth.login({ username, password }).then(user => {
    if (user.error) {
      dispatch({
        type: 'LOGIN_ERROR'
      })
      alert("Try Again")
    } else {
      localStorage.setItem('token', user.jwt);
      dispatch({ type: 'SET_CURRENT_USER', user });
      history.push('/profile');
    }
  });
};

export const fetchAllUsers = () => dispatch => {
  dispatch({ type: 'ASYNC_START' });
  adapter.auth.getAllUsers()
    .then(users => {
      dispatch({
        type: 'GET_ALL_USERS', users
      })
    })
}

export const loginNewUser = (data, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });
  adapter.auth.addUser(data).then(user => {
    localStorage.setItem('token', user.jwt);
    dispatch({ type: 'SET_CURRENT_USER', user });
    history.push('/profile');
  });

};

export const logoutUser = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT_USER' };
};
