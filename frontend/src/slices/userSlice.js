import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import userService from '../services/user';
import cvService from '../services/cv';
import { restoreInitialCVData } from './cvDataSlice';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

// Action creators

const retrieveLoggedUser = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('cvCreatorAuthToken');
    if (!token) {
      return;
    }
    userService.setToken(token);
    cvService.setToken(token);
    const userFull = await userService.getUser();
    dispatch(setUser(userFull));
  };
};

const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    localStorage.setItem('cvCreatorAuthToken', user.token);
    userService.setToken(user.token);
    cvService.setToken(user.token);
    const userFull = await userService.getUser();
    dispatch(setUser(userFull));
  };
};

const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('cvCreatorAuthToken');
    userService.setToken(null);
    cvService.setToken(null);
    dispatch(setUser(null));
    dispatch(restoreInitialCVData());
  };
};

const createUser = ({ username, password }) => {
  return async (dispatch) => {
    await userService.createUser({ username, password });
    await dispatch(loginUser({ username, password }));
  };
};

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
export { retrieveLoggedUser, loginUser, logoutUser, createUser };
