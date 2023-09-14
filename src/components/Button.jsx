import chevronDown from '../assets/icons/chevron-down.svg';
import chevronUp from '../assets/icons/chevron-up.svg';

function Button({ type, name, icon, onClick }) {
  if (!name && !icon) {
    switch (type) {
      case 'discard':
        name = 'Discard';
        break;

      case 'save':
        name = 'Done';
        break;

      case 'add':
        name = '+';
        break;

      case 'remove':
        name = '╳';
        break;

      case 'delete':
        name = 'Delete';
        break;

      case 'expand':
        icon = <img src={chevronDown} alt={type} />;
        break;

      case 'collapse':
        icon = <img src={chevronUp} alt={type} />;
        break;
    }
  }

  return (
    <button className={type} onClick={() => onClick()}>
      {icon || name}
    </button>
  );
}

export default Button;
