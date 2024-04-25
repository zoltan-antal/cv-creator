import './Footer.css';
import githubIcon from '../../assets/icons/github.svg';

const Footer = () => {
  return (
    <footer>
      <pre>Built by </pre>
      <a className="user" href="https://zoltan-antal.dev">
        <pre>Zoltan Antal</pre>
      </a>
      <pre> </pre>
      <a href="https://github.com/zoltan-antal">
        <img src={githubIcon} alt="GitHub" />
      </a>
      <pre> | </pre>
      <a className="repo" href="https://github.com/zoltan-antal/cv-creator">
        Source code
      </a>
    </footer>
  );
};

export default Footer;
