import './styles/App.css';
import { CvDataProvider } from './utils/CvDataContext';
import Header from './components/Header';
import Main from './components/MainComponent';
import Footer from './components/Footer';

function App() {
  return (
    <CvDataProvider>
      <Header />
      <Main />
      <Footer />
    </CvDataProvider>
  );
}

export default App;
