import { format, parseISO } from 'date-fns';
import parseCamelCaseString from './parseCamelCaseString';
import isFieldEmpty from './isFieldEmpty';

const mapViewFields = ({ data }) => {
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
    const isLong = key.includes('_long');
    const label = parseCamelCaseString(key).replace('_long', '') + ':';
    let content;

    if (typeof value === 'boolean') {
      content = <pre>{value ? 'yes' : 'no'}</pre>;
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
      if (value.every((content) => content === '')) {
        return null;
      }

      const nonEmptyValues = value.filter((element) => element !== '');

      if (isLong) {
        content = (
          <div className="list">
            {nonEmptyValues.map((item, index) => {
              return <pre key={index}>{item}</pre>;
            })}
          </div>
        );
      } else {
        content = <pre>{nonEmptyValues.join('\n')}</pre>;
      }
    }
    if (typeof value === 'string') {
      content = <pre>{value}</pre>;
    }
    if (key.includes('Date')) {
      if (!value) {
        return null;
      }
      if (ongoing && key === 'endDate') {
        return null;
      }
      content = <pre>{format(parseISO(value), 'MMMM yyyy')}</pre>;
    }
    return (
      <label className={`view-field${isLong ? ' long' : ''}`} key={key}>
        {label}
        {content}
      </label>
    );
  });
};

export default mapViewFields;
