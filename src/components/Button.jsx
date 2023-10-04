import expandIcon from '../assets/icons/chevron-down.svg';
import collapseIcon from '../assets/icons/chevron-up.svg';
import addIcon from '../assets/icons/plus-circle.svg';
import deleteIcon from '../assets/icons/trash-can.svg';
import '../styles/Button.css';

function Button({ type, name, className, icon, onClick }) {
  let classList = className ? className : '';

  if (!name && !icon) {
    switch (type) {
      case 'edit':
        name = 'Edit';
        break;

      case 'discard':
        name = 'Discard';
        break;

      case 'save':
        name = 'Done';
        break;

      case 'add':
        icon = <img src={addIcon} alt={'Add'} />;
        break;

      case 'remove':
        icon = <img src={deleteIcon} alt={'Remove'} />;
        break;

      case 'delete':
        name = 'Delete';
        break;

      case 'expand':
        icon = <img src={expandIcon} alt={'Expand'} />;
        break;

      case 'collapse':
        icon = <img src={collapseIcon} alt={'Collapse'} />;
        break;

      case 'yes':
        name = 'Yes';
        break;

      case 'no':
        name = 'No';
        break;
    }
  }

  switch (type) {
    case 'save':
      classList += ' green';
      break;

    case 'delete':
      classList += ' red';
      break;

    case 'yes':
      classList += ' green';
      break;

    case 'no':
      classList += ' red';
      break;

    default:
      break;
  }

  if (!classList) {
    classList = type;
  }

  return (
    <button className={classList} onClick={onClick}>
      {icon || name}
    </button>
  );
}

export default Button;
