import blankCv from '../dataStructures/blankCv';
import parseDates from './parseDates';

export default function addNewCv() {
  const newCv = { ...blankCv };
  newCv.cvId = crypto.randomUUID();
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
  cvList.push(newCv);

  localStorage.setItem('cvList', JSON.stringify(cvList));
  localStorage.setItem('cvId', newCv.cvId);
}
