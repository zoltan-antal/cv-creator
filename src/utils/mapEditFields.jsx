import EditorField from '../components/EditorField';
import parseCamelCaseString from './parseCamelCaseString';

function mapEditFields({ data, sectionName, index, onChange }) {
  const ongoingIndex = Object.keys(data).indexOf('ongoing');
  const ongoing = ongoingIndex ? Object.values(data)[ongoingIndex] : false;

  return Object.entries(data).map(([key, value]) => {
    if (key === 'id') {
      return null;
    }
    if (ongoing && key === 'endDate') {
      return null;
    }

    const title = parseCamelCaseString(key) + ':';

    return (
      <EditorField
        key={key}
        title={title}
        name={key}
        type={(() => {
          if (typeof value === 'string') {
            return 'text';
          }
          if (typeof value === 'boolean') {
            return 'checkbox';
          }
          if (typeof value === 'object' && value instanceof Date) {
            return 'month';
          }
        })()}
        value={value}
        sectionName={sectionName}
        index={index}
        onChange={onChange}
      />
    );
  });
}

export default mapEditFields;
