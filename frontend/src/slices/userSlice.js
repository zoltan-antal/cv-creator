import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import loginService from '../services/login';
import userService from '../services/user';
import cvService from '../services/cv';
import { restoreInitialCVData, setCVData } from './cvDataSlice';
import blankCV from '../dataStructures/blankCV';

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
  return async (dispatch, getState) => {
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
    let cvId = getState().cvData.selectedCVId;
    if (!fetchedCVList.find((cv) => cv.id === cvId)) {
      cvId = fetchedCVList[0].id;
      localStorage.setItem('cvId', cvId);
    }
    dispatch(setCVData({ cvList: fetchedCVList, cvId }));
  };
};

const loginUser = ({ username, password }) => {
  return async (dispatch, getState) => {
    const user = await loginService.login({ username, password });
    localStorage.setItem('cvCreatorAuthToken', user.token);
    userService.setToken(user.token);
    cvService.setToken(user.token);
    const cvList = getState().cvData.cvLists.savedCVData;
    const cvListToKeep = cvList.filter(
      (cv) => !_.isEqual(_.omit(cv, ['id']), _.omit(blankCV, ['id']))
    );
    let cvId = getState().cvData.selectedCVId;
    for (const cv of cvListToKeep) {
      const createdCV = await cvService.createCV(_.omit(cv, ['id']));
      if (cv.id === cvId) {
        cvId = createdCV.id;
      }
    }
    let fetchedCVList = await cvService.getCVs();
    let userFull = await userService.getUser();
    if (cvListToKeep.length === 0 && fetchedCVList.length === 0) {
      await cvService.createCV(_.omit(blankCV, ['id']));
      fetchedCVList = await cvService.getCVs();
      userFull = await userService.getUser();
    }
    if (cvListToKeep.length === 0) {
      cvId = fetchedCVList[0].id;
    }
    dispatch(setUser(userFull));
    dispatch(setCVData({ cvList: fetchedCVList, cvId }));
    localStorage.setItem('cvList', JSON.stringify(fetchedCVList));
    localStorage.setItem('cvId', cvId);
  };
};

const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('cvCreatorAuthToken');
    userService.setToken(null);
    cvService.setToken(null);
    dispatch(clearUser());
    dispatch(restoreInitialCVData());
  };
};

const deleteUser = ({ password }) => {
  return async (dispatch) => {
    await userService.deleteUser(password);
    localStorage.removeItem('cvCreatorAuthToken');
    userService.setToken(null);
    cvService.setToken(null);
    dispatch(clearUser());
    dispatch(restoreInitialCVData());
  };
};

const updateUser = ({ username, currentPassword, newPassword }) => {
  return async (dispatch) => {
    await userService.updateUser({ username, currentPassword, newPassword });
    const userFull = await userService.getUser();
    dispatch(setUser(userFull));
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
export {
  retrieveLoggedUser,
  loginUser,
  logoutUser,
  createUser,
  deleteUser,
  updateUser,
};
