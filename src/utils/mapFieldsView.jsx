import { format } from 'date-fns';
import parseCamelCaseString from './parseCamelCaseString';

function mapFieldsView({ data }) {
  const ongoingIndex = Object.keys(data).indexOf('ongoing');
  const ongoing = ongoingIndex ? Object.values(data)[ongoingIndex] : false;

  return Object.entries(data).map(([key, value]) => {
    const label = parseCamelCaseString(key) + ':';
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
      content = format(value, 'MMM yyyy');
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

export default mapFieldsView;
