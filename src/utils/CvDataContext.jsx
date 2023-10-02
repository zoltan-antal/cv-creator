/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import blankCv from '../dataStructures/blankCv';

const CvDataContext = createContext(null);
const CvDataDispatchContext = createContext(null);

const cvData = fetchStoredCvData();

const initialCvData = {
  savedCvData: cvData,
  tempCvData: cvData,
};

export function CvDataProvider({ children }) {
  const [cvData, dispatch] = useImmerReducer(cvDataReducer, initialCvData);

  return (
    <CvDataContext.Provider value={cvData}>
      <CvDataDispatchContext.Provider value={dispatch}>
        {children}
      </CvDataDispatchContext.Provider>
    </CvDataContext.Provider>
  );
}

export function useCvData() {
  return useContext(CvDataContext);
}

export function useCvDataDispatch() {
  return useContext(CvDataDispatchContext);
}

function cvDataReducer(cvData, action) {
  switch (action.type) {
    case 'update':
      _.set(cvData, ['tempCvData', ...action.path], action.value);
      break;

    case 'discard':
      _.set(
        cvData,
        ['tempCvData', ...action.path],
        _.get(cvData, ['savedCvData', ...action.path])
      );
      break;

    case 'save':
      _.set(
        cvData,
        ['savedCvData', ...action.path],
        _.get(cvData, ['tempCvData', ...action.path])
      );

      storeCvData(cvData.tempCvData);
      break;

    case 'addListElement':
      Object.keys(cvData).forEach((key) => {
        if (action.tempOnly && key === 'savedCvData') {
          return;
        }

        if (typeof action.blankDataElement === 'string') {
          _.set(
            cvData,
            [key, ...action.path],
            [..._.get(cvData, [key, ...action.path]), action.blankDataElement]
          );
          return;
        }

        _.set(
          cvData,
          [key, ...action.path],
          [
            ..._.get(cvData, [key, ...action.path]),
            { ...action.blankDataElement },
          ]
        );
        _.set(
          cvData,
          [
            ...[key, ...action.path],
            _.get(cvData, [key, ...action.path]).length - 1,
            'id',
          ],
          action.id
        );
      });

      if (action.save) {
        storeCvData(cvData.tempCvData);
      }

      break;

    case 'removeListElement':
      Object.keys(cvData).forEach((key) => {
        if (action.tempOnly && key === 'savedCvData') {
          return;
        }

        _.set(
          cvData,
          [key, ...action.path],
          [
            ..._.get(cvData, [key, ...action.path]).slice(0, action.index),
            ..._.get(cvData, [key, ...action.path]).slice(action.index + 1),
          ]
        );
      });

      if (action.save) {
        storeCvData(cvData.tempCvData);
      }

      break;

    case 'clearAllData':
      clearCvData(cvData);
      break;

    default:
      throw Error('Unknown action: ' + action.type);
  }
}

function fetchStoredCvData() {
  if (!localStorage.getItem('cvList')) {
    const cv = { ...blankCv };
    cv.cvId = crypto.randomUUID();
    localStorage.setItem('cvList', JSON.stringify([cv]));
    localStorage.setItem('cvId', cv.cvId);
  }
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
  let cvId = localStorage.getItem('cvId');
  let cvData;
  if (cvId) {
    for (const cv of cvList) {
      if (cv.cvId === cvId) {
        cvData = cv;
        break;
      }
    }
  }
  if (!cvId || !cvData) {
    cvData = cvList[0];
    localStorage.setItem('cvId', cvData.cvId);
  }

  return cvData;
}

function storeCvData(cvData) {
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
  let index;
  for (let i = 0; i < cvList.length; i++) {
    if (cvList[i].cvId === cvData.cvId) {
      index = i;
    }
  }
  cvList[index] = cvData;
  localStorage.setItem('cvList', JSON.stringify(cvList));
}

function clearCvData(cvData) {
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
  let index;
  for (let i = 0; i < cvList.length; i++) {
    if (cvList[i].cvId === cvData.tempCvData.cvId) {
      index = i;
    }
  }
  const cvName = cvList[index].cvName;
  const newBlankCv = { ...blankCv };
  newBlankCv.cvId = cvData.tempCvData.cvId;
  newBlankCv.cvName = cvName;
  cvList[index] = newBlankCv;
  console.log(newBlankCv);

  cvData.tempCvData = { ...newBlankCv };
  cvData.savedCvData = { ...newBlankCv };
  localStorage.setItem('cvList', JSON.stringify(cvList));
}

function parseDates(obj) {
  for (var key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // If the property is an object, recursively parse it
      obj[key] = parseDates(obj[key]);
    } else if (
      typeof obj[key] === 'string' &&
      obj[key].match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    ) {
      // If the property is a string in ISO date format, convert it to a Date object
      obj[key] = new Date(obj[key]);
    }
  }
  return obj;
}
