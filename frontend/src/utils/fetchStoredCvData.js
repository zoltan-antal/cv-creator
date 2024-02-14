import blankCv from '../dataStructures/blankCv';
import parseDates from '../utils/parseDates';

function fetchStoredCvData() {
  if (
    !localStorage.getItem('cvList') ||
    JSON.parse(localStorage.getItem('cvList')).length === 0
  ) {
    const cv = { ...blankCv };
    cv.id = crypto.randomUUID();
    localStorage.setItem('cvList', JSON.stringify([cv]));
    localStorage.setItem('cvId', cv.id);
  }
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));

  if (!localStorage.getItem('cvId')) {
    localStorage.setItem('cvId', cvList[0].id);
  }
  let cvId = localStorage.getItem('cvId');
  let cvIndex = cvList.findIndex((cv) => cv.id === cvId);
  if (cvIndex === -1) {
    cvId = cvList[0].id;
    cvIndex = 0;
  }

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
