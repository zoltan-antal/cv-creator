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
    return null;
  }

  return Object.entries(data).map(([key, value]) => {
    const label = parseCamelCaseString(key).replace('_long', '') + ':';
    let content;

    if (typeof value === 'boolean') {
      content = <>{value ? 'yes' : 'no'}</>;
    }
    if (!value) {
      return null;
    }
    if (key === 'id') {
      return null;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return null;
      }
      if (value.length === 1 && value[0] === '') {
        return null;
      }

      content = <>{value.join('\n')}</>;
    }
    if (typeof value === 'object' && value instanceof Date) {
      if (Date.parse(value) === 0) {
        return null;
      }
      if (ongoing && key === 'endDate') {
        return null;
      }
      content = <>{format(value, 'MMMM yyyy')}</>;
    }
    if (typeof value === 'string') {
      content = <>{value}</>;
    }
    return (
      <label className="view-field" key={key}>
        {label}
        <pre>{content}</pre>
      </label>
    );
  });
}

export default mapViewFields;
