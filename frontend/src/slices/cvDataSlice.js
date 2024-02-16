import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import blankCv from '../dataStructures/blankCv';
import exampleCv from '../dataStructures/exampleCv';

const generateInitialState = () => {
  const cv = _.cloneDeep(blankCv);
  cv.id = crypto.randomUUID();
  return {
    cvLists: {
      savedCvData: [_.cloneDeep(cv)],
      tempCvData: [_.cloneDeep(cv)],
    },
    selectedCvId: cv.id,
    selectedCvIndex: 0,
  };
};

const cvDataSlice = createSlice({
  name: 'cvData',
  initialState: generateInitialState(),
  reducers: {
    setCVData(state, action) {
      const { cvList, cvId } = action.payload;
      const index = cvList.findIndex((cv) => cv.id === cvId);
      state.cvLists.savedCvData = _.cloneDeep(cvList);
      state.cvLists.tempCvData = _.cloneDeep(cvList);
      state.selectedCvId = cvId;
      state.selectedCvIndex = index;
    },

    updateTemp(state, action) {
      const { value, path } = action.payload;
      _.set(state.cvLists.tempCvData[state.selectedCvIndex], [...path], value);
    },

    discardTemp(state) {
      state.cvLists.tempCvData[state.selectedCvIndex] = _.cloneDeep(
        state.cvLists.savedCvData[state.selectedCvIndex]
      );
    },

    saveTemp(state) {
      state.cvLists.savedCvData[state.selectedCvIndex] = _.cloneDeep(
        state.cvLists.tempCvData[state.selectedCvIndex]
      );
    },

    addListElement(state, action) {
      const { blankDataElement, path } = action.payload;
      const cv = state.cvLists.tempCvData[state.selectedCvIndex];
      _.set(cv, path, [
        ..._.get(cv, path),
        typeof blankDataElement === 'string' ? '' : { ...blankDataElement },
      ]);
    },

    removeListElement(state, action) {
      const { index, path } = action.payload;
      const cv = state.cvLists.tempCvData[state.selectedCvIndex];
      _.set(cv, path, [
        ..._.get(cv, path).slice(0, index),
        ..._.get(cv, path).slice(index + 1),
      ]);
    },

    clearAllData(state) {
      const newBlankCv = _.cloneDeep(blankCv);
      newBlankCv.id = state.cvLists.tempCvData[state.selectedCvIndex].id;
      newBlankCv.name = state.cvLists.tempCvData[state.selectedCvIndex].name;
      state.cvLists.tempCvData[state.selectedCvIndex] = _.cloneDeep(newBlankCv);
      state.cvLists.savedCvData[state.selectedCvIndex] =
        _.cloneDeep(newBlankCv);
    },

    addCV(state, action) {
      const { cv } = action.payload;
      state.cvLists.tempCvData.push(_.cloneDeep(cv));
      state.cvLists.savedCvData.push(_.cloneDeep(cv));
      state.selectedCvId = cv.id;
      state.selectedCvIndex++;
    },

    deleteCV(state, action) {
      const { id } = action.payload;
      const cvList = state.cvLists.savedCvData;
      if (cvList.length === 1) {
        return;
      }
      const cvListSorted = cvList.toSorted((a, b) =>
        a.name >= b.name ? 1 : -1
      );
      let index = cvList.findIndex((cv) => cv.id === id);
      let currentId = state.selectedCvId;
      let currentIndex = state.selectedCvIndex;
      let currentSortedIndex = cvListSorted.findIndex(
        (cv) => cv.id === currentId
      );

      const filteredCvList = cvList.filter((cv) => cv.id !== id);
      const filteredCvListSorted = filteredCvList.toSorted((a, b) =>
        a.name >= b.name ? 1 : -1
      );

      if (index < currentIndex) {
        currentIndex--;
      } else if (id === currentId) {
        if (currentSortedIndex != 0) {
          currentSortedIndex--;
        }
        currentId = filteredCvListSorted[currentSortedIndex].id;
        currentIndex = filteredCvList.findIndex((cv) => cv.id === currentId);
      }

      state.cvLists.tempCvData = filteredCvList;
      state.cvLists.savedCvData = filteredCvList;
      state.selectedCvId = currentId;
      state.selectedCvIndex = currentIndex;
    },

    setSelectedCVId(state, action) {
      let { id } = action.payload;
      const cvList = state.cvLists.savedCvData;
      let index = cvList.findIndex((cv) => cv.id === id);
      // if (index === -1) {
      //   id = cvList[0].id;
      //   index = 0;
      // }
      state.selectedCvId = id;
      state.selectedCvIndex = index;
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
        JSON.stringify(cvData.cvLists.savedCvData)
      );
      localStorage.setItem('cvId', cvData.selectedCvId);
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
  return (dispatch, getState) => {
    dispatch(saveTemp());
    const cvData = getState().cvData;
    localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.savedCvData));
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
  return (dispatch, getState) => {
    dispatch(clearAllData());
    const cvData = getState().cvData;
    localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.savedCvData));
  };
};

const addNewCV = ({ type }) => {
  return (dispatch, getState) => {
    let newCV;
    switch (type) {
      case 'blank':
        newCV = _.cloneDeep(blankCv);
        break;

      case 'example':
        newCV = _.cloneDeep(exampleCv);
        break;
    }
    // if (session) {
    //   newCV = await cvService.createCV(newCV);
    // } else {
    //   newCV.id = crypto.randomUUID();
    // }
    newCV.id = crypto.randomUUID();
    dispatch(addCV({ cv: newCV }));
    const cvData = getState().cvData;
    localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.savedCvData));
    localStorage.setItem('cvId', cvData.selectedCvId);
  };
};

const deleteCVById = ({ id }) => {
  return (dispatch, getState) => {
    dispatch(deleteCV({ id }));
    const cvData = getState().cvData;
    localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.savedCvData));
    localStorage.setItem('cvId', cvData.selectedCvId);
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
