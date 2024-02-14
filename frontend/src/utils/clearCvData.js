import _ from 'lodash';
import blankCv from '../dataStructures/blankCv';
import cvService from '../services/cv';

async function clearCvData(cvData) {
  const newBlankCv = { ...blankCv };
  newBlankCv.id = cvData.cvLists.tempCvData[cvData.selectedCvIndex].id;
  newBlankCv.name = cvData.cvLists.tempCvData[cvData.selectedCvIndex].name;

  cvData.cvLists.tempCvData[cvData.selectedCvIndex] = { ...newBlankCv };
  cvData.cvLists.savedCvData[cvData.selectedCvIndex] = { ...newBlankCv };
  await cvService.updateCV(cvData.selectedCvId, _.omit(newBlankCv, ['id']));
  localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.tempCvData));
}

export default clearCvData;
