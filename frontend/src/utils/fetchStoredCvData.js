import blankCv from '../dataStructures/blankCv';
import parseDates from '../utils/parseDates';

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

export default fetchStoredCvData;
