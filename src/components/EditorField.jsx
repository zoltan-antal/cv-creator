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
              onChange={
                sectionName
                  ? (e) => onChange(sectionName, index, name, e.target.value)
                  : (e) => onChange(name, e.target.value)
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
              onChange={
                sectionName
                  ? (e) => onChange(sectionName, index, name, e.target.checked)
                  : (e) => onChange(name, e.target.value)
              }
            ></input>
          );
        }
      })()}
    </label>
  );
}

export default EditorField;
