import blankCv from '../dataStructures/blankCv';

function clearCvData(cvData) {
  const newBlankCv = { ...blankCv };
  newBlankCv.id = cvData.cvLists.tempCvData[cvData.selectedCvIndex].id;
  newBlankCv.name = cvData.cvLists.tempCvData[cvData.selectedCvIndex].name;

  cvData.cvLists.tempCvData[cvData.selectedCvIndex] = { ...newBlankCv };
  cvData.cvLists.savedCvData[cvData.selectedCvIndex] = { ...newBlankCv };
  localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.tempCvData));
}

export default clearCvData;
