import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import LoginPage from '../Pages/LoginPage';
import HighScorePage from '../Pages/HighScorePage';
import SignInPage from '../Pages/SignInPage';
import GameOverPage from '../Pages/GameOverPage';
import UniversalTimerPage from '../Pages/UniversalTimerPage';
import UniversalFishPage from '../Pages/UniversalFishPage';
import PersonnalScorePage from '../Pages/PersonnalScorePage';
import PersonnalTimer from '../Pages/PersonnalTimer';
import PersonnalFish from '../Pages/PersonnalFish';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/new': NewPage,
  '/login':LoginPage,
  '/highscore':HighScorePage,
  '/signIn':SignInPage,
  '/gameOver':GameOverPage,
  '/timer':UniversalTimerPage,
  '/fish' :UniversalFishPage,
  '/personnal':PersonnalScorePage,
  '/personnalTimer':PersonnalTimer,
  '/personnalFish':PersonnalFish,

};

export default routes;
