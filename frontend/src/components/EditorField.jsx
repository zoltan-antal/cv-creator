import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTempCV } from '../slices/cvDataSlice';

function EditorField({ title, name, type, value, path }) {
  const dispatch = useDispatch();

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
                  dispatch(updateTempCV({ value: e.target.value, path }))
                }
              ></input>
            );

          case 'textarea':
            return (
              <textarea
                name={name}
                value={value}
                onChange={(e) =>
                  dispatch(updateTempCV({ value: e.target.value, path }))
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
                  dispatch(updateTempCV({ value: e.target.checked, path }))
                }
              ></input>
            );

          case 'month':
            return (
              <input
                type={type}
                name={name}
                value={value}
                onChange={(e) =>
                  dispatch(updateTempCV({ value: e.target.value, path }))
                }
              ></input>
            );
        }
      })()}
    </label>
  );
}

export default EditorField;
