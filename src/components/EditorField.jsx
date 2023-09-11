import { format } from 'date-fns';

function EditorField({
  title,
  name,
  type,
  value,
  sectionName,
  index,
  onChange,
}) {
  return (
    <label>
      {title}
      {(() => {
        if (type === 'text') {
          return (
            <input
              type={type}
              name={name}
              value={value}
              onChange={(e) =>
                onChange(sectionName, index, name, e.target.value)
              }
            ></input>
          );
        }
        if (type === 'checkbox') {
          return (
            <input
              type={type}
              name={name}
              checked={value}
              onChange={(e) =>
                onChange(sectionName, index, name, e.target.checked)
              }
            ></input>
          );
        }
        if (type === 'month') {
          return (
            <input
              type={type}
              name={name}
              value={Date.parse(value) !== 0 ? format(value, 'yyyy-MM') : ''}
              onChange={(e) =>
                onChange(sectionName, index, name, new Date(e.target.value))
              }
            ></input>
          );
        }
      })()}
    </label>
  );
}

export default EditorField;
