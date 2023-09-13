import EditorField from '../components/EditorField';
import parseCamelCaseString from './parseCamelCaseString';

function mapEditFields({ data, path, updateField }) {
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
        title={title.replace('_long', '')}
        name={key.replace('_long', '')}
        type={(() => {
          if (key.includes('_long')) {
            return 'textarea';
          }
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
        path={[...path, key]}
        onChange={updateField}
      />
    );
  });
}

export default mapEditFields;
