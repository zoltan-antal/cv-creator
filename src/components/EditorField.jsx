import { format } from 'date-fns';
import { useCvDataDispatch } from '../utils/CvDataContext';
import { useEffect } from 'react';

function EditorField({ title, name, type, value, path }) {
  const dispatchCvData = useCvDataDispatch();

  useEffect(() => {
    const textareas = document.querySelectorAll('.editor-field textarea');
    textareas.forEach((textarea) => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  });

  return (
    <label className="editor-field">
      {title}
      {(() => {
        switch (type) {
          case 'text':
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

          case 'textarea':
            return (
              <textarea
                name={name}
                value={value}
                onChange={(e) =>
                  dispatchCvData({
                    type: 'update',
                    path: path,
                    value: e.target.value,
                  })
                }
              ></textarea>
            );

          case 'checkbox':
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

          case 'month':
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
