import EditorField from '../components/EditorField';

function mapEditorFields({ data, sectionName, index, onChange }) {
  return Object.entries(data).map(([key, value]) => {
    if (key === 'id') {
      return null;
    }
    return (
      <EditorField
        key={key}
        title={key}
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

export default mapEditorFields;
