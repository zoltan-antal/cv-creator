import addNewCv from './addNewCv';
import parseDates from './parseDates';

export default function deleteCv(id) {
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
  if (cvList.length === 1) {
    addNewCv();
  }
  let currentId = localStorage.getItem('cvId');
  if (currentId === id) {
    let index = cvList.findIndex((cv) => cv.cvId === id);
    if (index === 0) {
      currentId = cvList[index + 1].cvId;
    } else {
      currentId = cvList[index - 1].cvId;
    }
    localStorage.setItem('cvId', currentId);
  }
  const filteredCvList = cvList.filter((cv) => {
    return cv.cvId !== id;
  });
  localStorage.setItem('cvList', JSON.stringify(filteredCvList));
}
