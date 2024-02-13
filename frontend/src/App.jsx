import './styles/App.css';
import { SessionProvider } from './utils/SessionContext';
import { CvDataProvider } from './utils/CvDataContext';
import Header from './components/Header';
import Main from './components/MainComponent';
import Footer from './components/Footer';

function App() {
  return (
    <SessionProvider>
      <CvDataProvider>
        <Header />
        <Main />
        <Footer />
      </CvDataProvider>
    </SessionProvider>
  );
}

export default App;
