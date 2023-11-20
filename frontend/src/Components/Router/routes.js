import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/RegisterPage';
import LoginPage from '../Pages/LoginPage';
import HighScorePage from '../Pages/HighScorePage';
import SignInPage from '../Pages/SignInPage';
import GameOverPage from '../Pages/GameOverPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/new': NewPage,
  '/login':LoginPage,
  '/highscore':HighScorePage,
  '/signIn':SignInPage,
  '/gameOver':GameOverPage,

};

export default routes;
