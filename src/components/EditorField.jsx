function EditorField({ title, name, type, value, onChange }) {
  return (
    <label>
      {title}
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      ></input>
    </label>
  );
}

export default EditorField;
