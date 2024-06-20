import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTempCV } from '../../slices/cvDataSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const EditorField = ({ title, name, type, value, path }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const textareas = document.querySelectorAll('.editor-field textarea');
    textareas.forEach((textarea) => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  });

  return (
    <label className="editor-field" onClick={(e) => e.preventDefault()}>
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
                key={Math.random()}
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
              <DatePicker
                className="month"
                selected={value}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                onChange={(date) =>
                  dispatch(
                    updateTempCV({ value: format(date, 'yyyy-MM'), path })
                  )
                }
              />
            );
        }
      })()}
    </label>
  );
};

export default EditorField;
