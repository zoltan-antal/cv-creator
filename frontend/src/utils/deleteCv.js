import addNewCv from './addNewCv';
import parseDates from './parseDates';

export default function deleteCv(id) {
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
  const cvListSorted = cvList.toSorted((a, b) =>
    a.cvName >= b.cvName ? 1 : -1
  );
  if (cvList.length === 1) {
    addNewCv();
  }
  let currentId = localStorage.getItem('cvId');
  if (currentId === id) {
    let index = cvListSorted.findIndex((cv) => cv.cvId === id);
    if (index === 0) {
      currentId = cvListSorted[index + 1].cvId;
    } else {
      currentId = cvListSorted[index - 1].cvId;
    }
    localStorage.setItem('cvId', currentId);
  }
  const filteredCvList = cvList.filter((cv) => {
    return cv.cvId !== id;
  });
  localStorage.setItem('cvList', JSON.stringify(filteredCvList));
}
