import blankCv from '../dataStructures/blankCv';

function clearCvData(cvData) {
  const newBlankCv = { ...blankCv };
  newBlankCv.cvId = cvData.cvLists.tempCvData[cvData.selectedCvIndex].cvId;
  newBlankCv.cvName = cvData.cvLists.tempCvData[cvData.selectedCvIndex].cvName;

  cvData.cvLists.tempCvData[cvData.selectedCvIndex] = { ...newBlankCv };
  cvData.cvLists.savedCvData[cvData.selectedCvIndex] = { ...newBlankCv };
  localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.tempCvData));
}

export default clearCvData;
