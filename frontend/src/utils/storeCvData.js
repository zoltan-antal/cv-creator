function storeCvData(cvData) {
  localStorage.setItem('cvList', JSON.stringify(cvData.cvLists.tempCvData));
}

export default storeCvData;
