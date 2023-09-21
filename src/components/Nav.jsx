import '../styles/Nav.css';
import { useContext } from 'react';
import { CvDataDispatchContext } from '../utils/CvDataContext';
import Button from './Button';

function Nav() {
  const dispatch = useContext(CvDataDispatchContext);

  return (
    <nav>
      <Button
        name={'Clear CV'}
        onClick={() => dispatch({ type: 'clearAllData' })}
      />
    </nav>
  );
}

export default Nav;
