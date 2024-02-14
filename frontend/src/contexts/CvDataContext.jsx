/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import parseDates from '../utils/parseDates';
import fetchStoredCvData from '../utils/fetchStoredCvData';
import storeCvData from '../utils/storeCvData';
import blankCv from '../dataStructures/blankCv';

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

    case 'clearAllData': {
      const newBlankCv = { ...blankCv };
      newBlankCv.id = cvData.cvLists.tempCvData[cvData.selectedCvIndex].id;
      newBlankCv.name = cvData.cvLists.tempCvData[cvData.selectedCvIndex].name;

      cvData.cvLists.tempCvData[cvData.selectedCvIndex] = { ...newBlankCv };
      cvData.cvLists.savedCvData[cvData.selectedCvIndex] = { ...newBlankCv };
      localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.tempCvData));
      break;
    }

    case 'reloadCvData': {
      const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
      console.log('cvList:');
      console.log(cvList);
      cvData.cvLists.tempCvData = cvList;
      cvData.cvLists.savedCvData = cvList;
      let selectedCvId = localStorage.getItem('cvId');
      let selectedCvIndex = cvList.findIndex((cv) => cv.id === selectedCvId);
      if (selectedCvIndex === -1) {
        selectedCvId = cvList[0].id;
        selectedCvIndex = 0;
      }
      cvData.selectedCvId = selectedCvId;
      cvData.selectedCvIndex = selectedCvIndex;
      break;
    }

    default:
      throw Error('Unknown action: ' + action.type);
  }
}
