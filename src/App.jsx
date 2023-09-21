import './styles/App.css';
import _ from 'lodash';
import { useImmerReducer } from 'use-immer';
import { CvDataContext, CvDataDispatchContext } from './utils/CvDataContext';
import Header from './components/Header';
import Main from './components/MainComponent';
import Footer from './components/Footer';
import blankCv from './dataStructures/blankCv';

function App() {
  const localCvData = JSON.parse(localStorage.getItem('cvData'));
  const initialCvData = {
    savedCvData: localCvData || blankCv,
    tempCvData: localCvData || blankCv,
  };

  const [cvData, dispatch] = useImmerReducer(cvDataReducer, initialCvData);

  return (
    <CvDataContext.Provider value={cvData}>
      <CvDataDispatchContext.Provider value={dispatch}>
        <Header />
        <Main />
        <Footer />
      </CvDataDispatchContext.Provider>
    </CvDataContext.Provider>
  );
}

export default App;

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
