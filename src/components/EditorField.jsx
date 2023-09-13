import { format } from 'date-fns';

function EditorField({ title, name, type, value, path, onChange }) {
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
              onChange={(e) => onChange(path, e.target.value)}
            ></input>
          );
        }
        if (type === 'textarea') {
          return (
            <textarea
              name={name}
              value={value}
              onChange={(e) => onChange(path, e.target.value)}
            ></textarea>
          );
        }
        if (type === 'checkbox') {
          return (
            <input
              type={type}
              name={name}
              checked={value}
              onChange={(e) => onChange(path, e.target.checked)}
            ></input>
          );
        }
        if (type === 'month') {
          return (
            <input
              type={type}
              name={name}
              value={Date.parse(value) !== 0 ? format(value, 'yyyy-MM') : ''}
              onChange={(e) => onChange(path, new Date(e.target.value))}
            ></input>
          );
        }
      })()}
    </label>
  );
}

export default EditorField;
