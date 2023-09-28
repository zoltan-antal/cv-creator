/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import blankCv from '../dataStructures/blankCv';

const CvDataContext = createContext(null);
const CvDataDispatchContext = createContext(null);

const localCvData = parseDates(JSON.parse(localStorage.getItem('cvData')));
const initialCvData = {
  savedCvData: localCvData || blankCv,
  tempCvData: localCvData || blankCv,
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
      localStorage.setItem('cvData', JSON.stringify(cvData.tempCvData));
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
        localStorage.setItem('cvData', JSON.stringify(cvData.tempCvData));
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
        localStorage.setItem('cvData', JSON.stringify(cvData.tempCvData));
      }

      break;

    case 'clearAllData':
      cvData.tempCvData = blankCv;
      cvData.savedCvData = blankCv;
      localStorage.setItem('cvData', JSON.stringify(blankCv));
      break;

    default:
      throw Error('Unknown action: ' + action.type);
  }
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
