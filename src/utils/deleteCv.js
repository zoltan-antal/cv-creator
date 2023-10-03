import parseDates from './parseDates';

export default function deleteCv(id) {
  console.log('deleteCv, prop id: ' + id);
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
  console.log('deleteCv, cvList: ' + cvList);
  console.log(cvList);
  let currentId = localStorage.getItem('cvId');
  if (currentId === id) {
    let index = cvList.findIndex((cv) => cv.cvId === id);
    index--;
    currentId = cvList[index].cvId;
    localStorage.setItem('cvId', currentId);
  }
  const filteredCvList = cvList.filter((cv) => {
    return cv.cvId !== id;
  });
  console.log('deleteCv, filteredCvList: ' + filteredCvList);
  console.log(filteredCvList);
  localStorage.setItem('cvList', JSON.stringify(filteredCvList));

  console.log('deleteCv, currentId: ' + currentId);
  return currentId;
}
