import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import blankCV from '../dataStructures/blankCV';
import exampleCV from '../dataStructures/exampleCV';
import cvService from '../services/cv';
import userService from '../services/user';
import { setUser } from './userSlice';

const generateBlankCV = () => {
  const cv = _.cloneDeep(blankCV);
  cv.id = crypto.randomUUID();
  return cv;
};

const generateInitialState = () => {
  const cv = generateBlankCV();
  return {
    cvLists: {
      savedCVData: [_.cloneDeep(cv)],
      tempCVData: [_.cloneDeep(cv)],
    },
    selectedCVId: cv.id,
    selectedCVIndex: 0,
  };
};

const cvDataSlice = createSlice({
  name: 'cvData',
  initialState: generateInitialState(),
  reducers: {
    setCVData(state, action) {
      const { cvList, cvId } = action.payload;
      const index = cvList.findIndex((cv) => cv.id === cvId);
      state.cvLists.savedCVData = _.cloneDeep(cvList);
      state.cvLists.tempCVData = _.cloneDeep(cvList);
      state.selectedCVId = cvId;
      state.selectedCVIndex = index;
    },

    updateTemp(state, action) {
      const { value, path } = action.payload;
      _.set(state.cvLists.tempCVData[state.selectedCVIndex], [...path], value);
    },

    discardTemp(state) {
      state.cvLists.tempCVData[state.selectedCVIndex] = _.cloneDeep(
        state.cvLists.savedCVData[state.selectedCVIndex]
      );
    },

    saveTemp(state) {
      state.cvLists.savedCVData[state.selectedCVIndex] = _.cloneDeep(
        state.cvLists.tempCVData[state.selectedCVIndex]
      );
    },

    addListElement(state, action) {
      const { blankDataElement, path } = action.payload;
      const cv = state.cvLists.tempCVData[state.selectedCVIndex];
      _.set(cv, path, [..._.get(cv, path), blankDataElement]);
    },

    removeListElement(state, action) {
      const { index, path } = action.payload;
      const cv = state.cvLists.tempCVData[state.selectedCVIndex];
      _.set(cv, path, [
        ..._.get(cv, path).slice(0, index),
        ..._.get(cv, path).slice(index + 1),
      ]);
    },

    clearAllData(state) {
      const newBlankCV = _.cloneDeep(blankCV);
      newBlankCV.id = state.cvLists.tempCVData[state.selectedCVIndex].id;
      newBlankCV.name = state.cvLists.tempCVData[state.selectedCVIndex].name;
      state.cvLists.tempCVData[state.selectedCVIndex] = _.cloneDeep(newBlankCV);
      state.cvLists.savedCVData[state.selectedCVIndex] =
        _.cloneDeep(newBlankCV);
    },

    addCV(state, action) {
      const { cv } = action.payload;
      state.cvLists.tempCVData.push(_.cloneDeep(cv));
      state.cvLists.savedCVData.push(_.cloneDeep(cv));
      state.selectedCVId = cv.id;
      state.selectedCVIndex++;
    },

    deleteCV(state, action) {
      const { id } = action.payload;
      const cvList = state.cvLists.savedCVData;
      if (cvList.length === 1) {
        return;
      }
      const cvListSorted = cvList.toSorted((a, b) =>
        a.name >= b.name ? 1 : -1
      );
      let index = cvList.findIndex((cv) => cv.id === id);
      let currentId = state.selectedCVId;
      let currentIndex = state.selectedCVIndex;
      let currentSortedIndex = cvListSorted.findIndex(
        (cv) => cv.id === currentId
      );

      const filteredCVList = cvList.filter((cv) => cv.id !== id);
      const filteredCVListSorted = filteredCVList.toSorted((a, b) =>
        a.name >= b.name ? 1 : -1
      );

      if (index < currentIndex) {
        currentIndex--;
      } else if (id === currentId) {
        if (currentSortedIndex != 0) {
          currentSortedIndex--;
        }
        currentId = filteredCVListSorted[currentSortedIndex].id;
        currentIndex = filteredCVList.findIndex((cv) => cv.id === currentId);
      }

      state.cvLists.tempCVData = filteredCVList;
      state.cvLists.savedCVData = filteredCVList;
      state.selectedCVId = currentId;
      state.selectedCVIndex = currentIndex;
    },

    setSelectedCVId(state, action) {
      let { id } = action.payload;
      const cvList = state.cvLists.savedCVData;
      let index = cvList.findIndex((cv) => cv.id === id);
      state.selectedCVId = id;
      state.selectedCVIndex = index;
    },
  },
});

// Action creators

const initialiseCVData = () => {
  return (dispatch, getState) => {
    const cvData = getState().cvData;
    const cvList = JSON.parse(localStorage.getItem('cvList'));
    let cvId = localStorage.getItem('cvId');
    if (!cvList) {
      localStorage.setItem(
        'cvList',
        JSON.stringify(cvData.cvLists.savedCVData)
      );
      localStorage.setItem('cvId', cvData.selectedCVId);
      return;
    }
    const cvIndex = cvList.findIndex((cv) => cv.id === cvId);
    if (!cvId || cvIndex === -1) {
      cvId = cvList[0].id;
      localStorage.setItem('cvId', cvId);
    }
    dispatch(setCVData({ cvList, cvId }));
  };
};

const restoreInitialCVData = () => {
  return (dispatch) => {
    const cv = generateBlankCV();
    const cvList = [cv];
    dispatch(setCVData({ cvList, cvId: cv.id }));
    localStorage.setItem('cvList', JSON.stringify(cvList));
    localStorage.setItem('cvId', cv.id);
  };
};

const updateTempCV = ({ value, path }) => {
  return (dispatch) => {
    dispatch(updateTemp({ value, path }));
  };
};

const discardTempCV = () => {
  return (dispatch) => {
    dispatch(discardTemp());
  };
};

const saveTempCV = () => {
  return async (dispatch, getState) => {
    dispatch(saveTemp());
    const cvData = getState().cvData;
    const cvList = cvData.cvLists.savedCVData;
    localStorage.setItem('cvList', JSON.stringify(cvList));
    const user = getState().user;
    if (!user) {
      return;
    }
    const id = cvData.selectedCVId;
    const index = cvList.findIndex((cv) => cv.id === id);
    await cvService.updateCV(id, cvList[index]);
  };
};

const addListElementToTempCV = ({ blankDataElement, path }) => {
  return (dispatch) => {
    dispatch(addListElement({ blankDataElement, path }));
  };
};

const removeListElementFromTempCV = ({ index, path }) => {
  return (dispatch) => {
    dispatch(removeListElement({ index, path }));
  };
};

const clearCV = () => {
  return async (dispatch, getState) => {
    dispatch(clearAllData());
    const cvData = getState().cvData;
    const cvList = cvData.cvLists.savedCVData;
    localStorage.setItem('cvList', JSON.stringify(cvList));
    const user = getState().user;
    if (!user) {
      return;
    }
    const id = cvData.selectedCVId;
    const index = cvList.findIndex((cv) => cv.id === id);
    await cvService.updateCV(id, cvList[index]);
  };
};

const addNewCV = ({ type }) => {
  return async (dispatch, getState) => {
    let newCV;
    switch (type) {
      case 'blank':
        newCV = generateBlankCV();
        break;

      case 'example':
        newCV = _.cloneDeep(exampleCV);
        newCV.id = crypto.randomUUID();
        break;
    }
    const user = getState().user;
    if (user) {
      newCV = await cvService.createCV(newCV);
    } else {
      newCV.id = crypto.randomUUID();
    }
    dispatch(addCV({ cv: newCV }));
    const cvData = getState().cvData;
    localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.savedCVData));
    localStorage.setItem('cvId', cvData.selectedCVId);
  };
};

const deleteCVById = ({ id }) => {
  return async (dispatch, getState) => {
    dispatch(deleteCV({ id }));
    const cvData = getState().cvData;
    localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.savedCVData));
    localStorage.setItem('cvId', cvData.selectedCVId);
    const user = getState().user;
    if (!user) {
      return;
    }
    await cvService.deleteCV(id);
    const userFull = await userService.getUser();
    dispatch(setUser(userFull));
  };
};

const updateSelectedCVId = ({ id }) => {
  return (dispatch) => {
    dispatch(setSelectedCVId({ id }));
    localStorage.setItem('cvId', id);
  };
};

export default cvDataSlice.reducer;
export const {
  setCVData,
  updateTemp,
  discardTemp,
  saveTemp,
  addListElement,
  removeListElement,
  clearAllData,
  addCV,
  deleteCV,
  setSelectedCVId,
} = cvDataSlice.actions;
export {
  initialiseCVData,
  restoreInitialCVData,
  updateTempCV,
  discardTempCV,
  saveTempCV,
  addListElementToTempCV,
  removeListElementFromTempCV,
  clearCV,
  addNewCV,
  updateSelectedCVId,
  deleteCVById,
};
