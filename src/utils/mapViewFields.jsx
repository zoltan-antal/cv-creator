import { format } from 'date-fns';
import parseCamelCaseString from './parseCamelCaseString';
import isFieldEmpty from './isFieldEmpty';

function mapViewFields({ data }) {
  const ongoingIndex = Object.keys(data).indexOf('ongoing');
  const ongoing = ongoingIndex ? Object.values(data)[ongoingIndex] : false;

  let isAllEmpty = true;
  for (const entry of Object.entries(data)) {
    if (!isFieldEmpty(entry)) {
      isAllEmpty = false;
      break;
    }
  }
  if (isAllEmpty) {
    return <p>No data</p>;
  }

  return Object.entries(data).map(([key, value]) => {
    const label = parseCamelCaseString(key).replace('_long', '') + ':';
    let content;

    if (typeof value === 'boolean') {
      content = value ? 'yes' : 'no';
    }
    if (!value) {
      return null;
    }
    if (key === 'id') {
      return null;
    }
    if (Array.isArray(value)) {
      return null;
    }
    if (typeof value === 'object' && value instanceof Date) {
      if (Date.parse(value) === 0) {
        return null;
      }
      if (ongoing && key === 'endDate') {
        return null;
      }
      content = format(value, 'MMMM yyyy');
    }
    if (typeof value === 'string') {
      content = value;
    }
    return (
      <div key={key}>
        <p>{label}</p>
        <p>{content}</p>
      </div>
    );
  });
}

export default mapViewFields;
