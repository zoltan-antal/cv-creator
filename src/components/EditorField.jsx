import { format } from 'date-fns';
import { useCvDataDispatch } from '../utils/CvDataContext';

function EditorField({ title, name, type, value, path }) {
  const dispatchCvData = useCvDataDispatch();

  return (
    <label className="editor-field">
      {title}
      {(() => {
        if (type === 'text') {
          return (
            <input
              type={type}
              name={name}
              value={value}
              onChange={(e) =>
                dispatchCvData({
                  type: 'update',
                  path: path,
                  value: e.target.value,
                })
              }
            ></input>
          );
        }
        if (type === 'textarea') {
          return (
            <textarea
              name={name}
              value={value}
              onChange={(e) => {
                dispatchCvData({
                  type: 'update',
                  path: path,
                  value: e.target.value,
                });
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            ></textarea>
          );
        }
        if (type === 'checkbox') {
          return (
            <input
              type={type}
              name={name}
              checked={value}
              onChange={(e) =>
                dispatchCvData({
                  type: 'update',
                  path: path,
                  value: e.target.checked,
                })
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
                dispatchCvData({
                  type: 'update',
                  path: path,
                  value: new Date(e.target.value),
                })
              }
            ></input>
          );
        }
      })()}
    </label>
  );
}

export default EditorField;
