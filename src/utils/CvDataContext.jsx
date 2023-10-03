/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import blankCv from '../dataStructures/blankCv';
import parseDates from '../utils/parseDates';

const CvDataContext = createContext(null);
const CvDataDispatchContext = createContext(null);

// const fetchedCvData = fetchStoredCvData();

// const initialCvData = {
//   savedCvData: fetchedCvData,
//   tempCvData: fetchedCvData,
// };

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
        _.set(
          cvData,
          [
            ['cvLists', key, cvData.selectedCvIndex, ...action.path],
            _.get(cvData, [
              'cvLists',
              key,
              cvData.selectedCvIndex,
              ...action.path,
            ]).length - 1,
            'id',
          ],
          action.id
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
      console.log('RELOADCVDATA');
      console.log('stored cvList:');
      console.log(JSON.parse(localStorage.getItem('cvList')));
      console.log('stored cvId:');
      console.log(localStorage.getItem('cvId'));
      cvData.cvLists.tempCvData = parseDates(
        JSON.parse(localStorage.getItem('cvList'))
      );
      cvData.cvLists.savedCvData = cvData.cvLists.tempCvData;
      cvData.selectedCvId = localStorage.getItem('cvId');
      cvData.selectedCvIndex = cvData.cvLists.savedCvData.findIndex(
        (cv) => cv.cvId === cvData.selectedCvId
      );
      // consoe.log(cvData);
      break;

    default:
      throw Error('Unknown action: ' + action.type);
  }
}

function fetchStoredCvData() {
  if (
    !localStorage.getItem('cvList') ||
    JSON.parse(localStorage.getItem('cvList')).length === 0
  ) {
    const cv = { ...blankCv };
    cv.cvId = crypto.randomUUID();
    localStorage.setItem('cvList', JSON.stringify([cv]));
    localStorage.setItem('cvId', cv.cvId);
  }
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));

  if (!localStorage.getItem('cvId')) {
    localStorage.setItem('cvId', cvList[0].cvId);
  }
  const cvId = localStorage.getItem('cvId');
  const cvIndex = cvList.findIndex((cv) => cv.cvId === cvId);

  const cvData = {
    cvLists: {
      savedCvData: cvList,
      tempCvData: cvList,
    },
    selectedCvId: cvId,
    selectedCvIndex: cvIndex,
  };

  return cvData;
}

function storeCvData(cvData) {
  localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.tempCvData));
}

function clearCvData(cvData) {
  const newBlankCv = { ...blankCv };
  newBlankCv.cvId = cvData.cvLists.tempCvData[cvData.selectedCvIndex].cvId;
  newBlankCv.cvName = cvData.cvLists.tempCvData[cvData.selectedCvIndex].cvName;

  cvData.cvLists.tempCvData[cvData.selectedCvIndex] = { ...newBlankCv };
  cvData.cvLists.savedCvData[cvData.selectedCvIndex] = { ...newBlankCv };
  localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.tempCvData));
}
