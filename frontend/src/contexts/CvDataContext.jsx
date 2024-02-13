/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import parseDates from '../utils/parseDates';
import fetchStoredCvData from '../utils/fetchStoredCvData';
import storeCvData from '../utils/storeCvData';
import clearCvData from '../utils/clearCvData';

const CvDataContext = createContext(null);
const CvDataDispatchContext = createContext(null);

export function CvDataProvider({ children }) {
  const [cvData, dispatch] = useImmerReducer(
    cvDataReducer,
    fetchStoredCvData()
  );

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
      _.set(
        cvData.cvLists.tempCvData[cvData.selectedCvIndex],
        [...action.path],
        action.value
      );
      break;

    case 'discard':
      _.set(
        cvData.cvLists.tempCvData[cvData.selectedCvIndex],
        [...action.path],
        _.get(cvData.cvLists.savedCvData[cvData.selectedCvIndex], [
          ...action.path,
        ])
      );
      break;

    case 'save':
      _.set(
        cvData.cvLists.savedCvData[cvData.selectedCvIndex],
        [...action.path],
        _.get(cvData.cvLists.tempCvData[cvData.selectedCvIndex], [
          ...action.path,
        ])
      );

      storeCvData(cvData);
      break;

    case 'addListElement':
      Object.keys(cvData.cvLists).forEach((key) => {
        if (action.tempOnly && key === 'savedCvData') {
          return;
        }

        if (typeof action.blankDataElement === 'string') {
          _.set(
            cvData,
            ['cvLists', key, cvData.selectedCvIndex, ...action.path],
            [
              ..._.get(cvData, [
                'cvLists',
                key,
                cvData.selectedCvIndex,
                ...action.path,
              ]),
              action.blankDataElement,
            ]
          );
          return;
        }

        _.set(
          cvData,
          ['cvLists', key, cvData.selectedCvIndex, ...action.path],
          [
            ..._.get(cvData, [
              'cvLists',
              key,
              cvData.selectedCvIndex,
              ...action.path,
            ]),
            { ...action.blankDataElement },
          ]
        );
      });

      if (action.save) {
        storeCvData(cvData);
      }

      break;

    case 'removeListElement':
      Object.keys(cvData.cvLists).forEach((key) => {
        if (action.tempOnly && key === 'savedCvData') {
          return;
        }

        _.set(
          cvData,
          ['cvLists', key, cvData.selectedCvIndex, ...action.path],
          [
            ..._.get(cvData, [
              'cvLists',
              key,
              cvData.selectedCvIndex,
              ...action.path,
            ]).slice(0, action.index),
            ..._.get(cvData, [
              'cvLists',
              key,
              cvData.selectedCvIndex,
              ...action.path,
            ]).slice(action.index + 1),
          ]
        );
      });

      if (action.save) {
        storeCvData(cvData);
      }

      break;

    case 'clearAllData':
      clearCvData(cvData);
      break;

    case 'reloadCvData':
      cvData.cvLists.tempCvData = parseDates(
        JSON.parse(localStorage.getItem('cvList'))
      );
      cvData.cvLists.savedCvData = cvData.cvLists.tempCvData;
      cvData.selectedCvId = localStorage.getItem('cvId');
      cvData.selectedCvIndex = cvData.cvLists.savedCvData.findIndex(
        (cv) => cv.id === cvData.selectedCvId
      );
      break;

    default:
      throw Error('Unknown action: ' + action.type);
  }
}
