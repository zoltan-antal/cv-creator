import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import loginService from '../services/login';
import userService from '../services/user';
import cvService from '../services/cv';
import { initialiseCVData, restoreInitialCVData } from './cvDataSlice';
import blankCv from '../dataStructures/blankCv';

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
    const fetchedCVList = await cvService.getCVs();
    localStorage.setItem('cvList', JSON.stringify(fetchedCVList));
    dispatch(initialiseCVData());
  };
};

const loginUser = ({ username, password }) => {
  return async (dispatch, getState) => {
    const user = await loginService.login({ username, password });
    localStorage.setItem('cvCreatorAuthToken', user.token);
    userService.setToken(user.token);
    cvService.setToken(user.token);
    const cvList = getState().cvData.cvLists.savedCvData;
    const cvListToKeep = cvList.filter(
      (cv) => !_.isEqual(_.omit(cv, ['id']), _.omit(blankCv, ['id']))
    );
    cvListToKeep.forEach(
      async (cv) => await cvService.createCV(_.omit(cv, ['id']))
    );
    let userFull = await userService.getUser();
    let fetchedCVList = await cvService.getCVs();
    if (cvListToKeep.length === 0 && fetchedCVList.length === 0) {
      await cvService.createCV(_.omit(blankCv, ['id']));
      fetchedCVList = await cvService.getCVs();
      userFull = await userService.getUser();
    }
    dispatch(setUser(userFull));
    localStorage.setItem('cvList', JSON.stringify(fetchedCVList));
    dispatch(initialiseCVData());
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
