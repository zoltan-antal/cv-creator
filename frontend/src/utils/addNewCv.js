import blankCv from '../dataStructures/blankCv';
import exampleCv from '../dataStructures/exampleCv';
import parseDates from './parseDates';

export default function addNewCv({ type }) {
  let newCv;
  switch (type) {
    case 'blank':
      newCv = { ...blankCv };
      break;

    case 'example':
      newCv = { ...exampleCv };
      break;
  }
  newCv.id = crypto.randomUUID();
  const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
  cvList.push(newCv);

  localStorage.setItem('cvList', JSON.stringify(cvList));
  localStorage.setItem('cvId', newCv.id);
}
