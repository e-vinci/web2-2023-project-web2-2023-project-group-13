import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import HighScorePage from '../Pages/HighScorePage';
import SignInPage from '../Pages/SignInPage';
import GameOverPage from '../Pages/GameOverPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/login':LoginPage,
  '/highscore':HighScorePage,
  '/signIn':SignInPage,
  '/gameOver':GameOverPage,

};

export default routes;
