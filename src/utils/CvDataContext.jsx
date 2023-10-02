/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import blankCv from '../dataStructures/blankCv';
import parseDates from '../utils/parseDates';

const CvDataContext = createContext(null);
const CvDataDispatchContext = createContext(null);

const fetchedCvData = fetchStoredCvData();

const initialCvData = {
  savedCvData: fetchedCvData,
  tempCvData: fetchedCvData,
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

    case 'openCv':
      openCv({ id: action.cvId, cvData: cvData });
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
  const index = cvList.findIndex((cv) => cv.cvId === cvData.cvId);
  cvList[index] = cvData;
  localStorage.setItem('cvList', JSON.stringify(cvList));
}

function clearCvData(cvData) {
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
  const index = cvList.findIndex((cv) => cv.cvId === cvData.tempCvData.cvId);
  const cvName = cvList[index].cvName;
  const newBlankCv = { ...blankCv };
  newBlankCv.cvId = cvData.tempCvData.cvId;
  newBlankCv.cvName = cvName;
  cvList[index] = newBlankCv;

  cvData.tempCvData = { ...newBlankCv };
  cvData.savedCvData = { ...newBlankCv };
  localStorage.setItem('cvList', JSON.stringify(cvList));
}

function openCv({ id, cvData }) {
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
  const index = cvList.findIndex((cv) => cv.cvId === id);
  cvData.savedCvData = cvList[index];
  cvData.tempCvData = cvList[index];
}
