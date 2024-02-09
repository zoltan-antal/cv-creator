import EditorField from '../components/EditorField';
import EditorList from '../components/EditorList';
import parseCamelCaseString from './parseCamelCaseString';

function mapEditFields({ data, path }) {
  const ongoingIndex = Object.keys(data).indexOf('ongoing');
  const ongoing = ongoingIndex ? Object.values(data)[ongoingIndex] : false;

  return Object.entries(data).map(([key, value]) => {
    if (key === 'id') {
      return null;
    }
    if (ongoing && key === 'endDate') {
      return null;
    }

    const title = parseCamelCaseString(key).replace('_long', '') + ':';

    if (Array.isArray(value)) {
      return (
        <EditorList
          key={key}
          title={title}
          type={key.includes('_long') ? 'textarea' : 'text'}
          path={[...path, key]}
          data={value}
        />
      );
    }

    return (
      <EditorField
        key={key}
        title={title}
        name={title}
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
      />
    );
  });
}

export default mapEditFields;
