function Button({ type, name, onClick }) {
  if (!name) {
    switch (type) {
      case 'discard':
        name = 'Discard';
        break;

      case 'save':
        name = 'Done';
        break;
    }
  }

  return (
    <button className={type} onClick={() => onClick()}>
      {name}
    </button>
  );
}

export default Button;
