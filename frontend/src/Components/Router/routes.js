import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import LoginPage from '../Pages/LoginPage';
import HighScorePage from '../Pages/HighScorePage';
import SignInPage from '../Pages/SignInPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/new': NewPage,
  '/login':LoginPage,
  '/highscore':HighScorePage,
  '/signIn':SignInPage,

};

export default routes;
