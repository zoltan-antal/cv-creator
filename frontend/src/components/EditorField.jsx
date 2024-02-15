// import { useCvDataDispatch } from '../contexts/CvDataContext';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTempCV } from '../slices/cvDataSlice';

function EditorField({ title, name, type, value, path }) {
  // const dispatchCvData = useCvDataDispatch();
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
                onChange={
                  (e) => dispatch(updateTempCV({ value: e.target.value, path }))
                  // dispatchCvData({
                  //   type: 'update',
                  //   path: path,
                  //   value: e.target.value,
                  // })
                }
              ></input>
            );

          case 'textarea':
            return (
              <textarea
                name={name}
                value={value}
                onChange={
                  (e) => dispatch(updateTempCV({ value: e.target.value, path }))
                  // dispatchCvData({
                  //   type: 'update',
                  //   path: path,
                  //   value: e.target.value,
                  // })
                }
              ></textarea>
            );

          case 'checkbox':
            return (
              <input
                type={type}
                name={name}
                checked={value}
                onChange={
                  (e) =>
                    dispatch(updateTempCV({ value: e.target.checked, path }))
                  // dispatchCvData({
                  //   type: 'update',
                  //   path: path,
                  //   value: e.target.checked,
                  // })
                }
              ></input>
            );

          case 'month':
            return (
              <input
                type={type}
                name={name}
                // value={value ? format(value, 'yyyy-MM') : ''}
                value={value}
                onChange={
                  // (e) => {
                  //   const dateValue = new Date(e.target.value);
                  //   const isoDateString = dateValue.toISOString();
                  //   dispatch(updateTempCV({ value: isoDateString, path }));
                  // }
                  (e) => dispatch(updateTempCV({ value: e.target.value, path }))
                  // dispatchCvData({
                  //   type: 'update',
                  //   path: path,
                  //   value: new Date(e.target.value),
                  // })
                }
              ></input>
            );
        }
      })()}
    </label>
  );
}

export default EditorField;
