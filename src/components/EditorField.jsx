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
    </label>
  );
}

export default EditorField;
