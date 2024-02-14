import addNewCv from './addNewCv';
import parseDates from './parseDates';
import cvService from '../services/cv';

export default async function deleteCv(id) {
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
  const cvListSorted = cvList.toSorted((a, b) => (a.name >= b.name ? 1 : -1));
  if (cvList.length === 1) {
    addNewCv();
  }
  let currentId = localStorage.getItem('cvId');
  if (currentId === id) {
    let index = cvListSorted.findIndex((cv) => cv.id === id);
    if (index === 0) {
      currentId = cvListSorted[index + 1].id;
    } else {
      currentId = cvListSorted[index - 1].id;
    }
    localStorage.setItem('cvId', currentId);
  }
  const filteredCvList = cvList.filter((cv) => cv.id !== id);
  await cvService.deleteCV(id);
  localStorage.setItem('cvList', JSON.stringify(filteredCvList));
}
