import { clearPage } from '../../utils/render';
// import navigation
import Navigate from '../Router/Navigate';
// import images
import sky from '../../assets/sky.png';
import ground from '../../assets/longGround.png';
import cryingCatio from '../../assets/cryingCatio.png';
import bush from '../../assets/bush.png';
// import fish from '../../assets/Fish.png';

const GameOverPage = () => {
  clearPage();
  // get main
  const main = document.querySelector('main');
  // add content
  main.innerHTML += renderContent();
  // get buttons
  const replayButton = document.querySelector('#replayButton');
  const scoreButton = document.querySelector('#scores');
  const HomeButton = document.querySelector('#homepage');
  // add EventListener
  replayButton?.addEventListener('click',redirectGamePage);
  scoreButton?.addEventListener('click',redirectHighScorePage);
  HomeButton?.addEventListener('click',redirectToHomePage);
};

function renderContent(){
    const content = `
        <div id="skyContainer">
            <img id="skyImage" src="${sky}">
            <div id="textContainerGameOver">
                <h1 class=gameOverFont>GAME OVER!</h1>
                <p class="pGameOverFont"> Timer : </p>
                <p class="pGameOverFont"> FISH : </p>
            </div>
            <div id="buttonContainer">
                <button id="replayButton" class="gameoverButton">REPLAY</button>
                <br>
                <br>
                <button id="scores" class="gameoverButton">HIGH SCORES</button>
                <br>
                <br>
                <button id="homepage" class="gameoverButton">BACK TO MENU</button>
                <br>
                <br>
            </div>
            <div id="groundContainer">
                <img id="groundImage" src="${ground}">
            </div>
            <div id="cryingCatioContainer">
                <img id="cryingCatioImage" src="${cryingCatio}">
            </div>
            <div id="bushContainer">
                <img id="bushImage" src="${bush}">
            </div>
        </div>
    `;
    return content;
}
function redirectGamePage(){
    Navigate('/game');
}

function redirectToHomePage(){
    Navigate('/');
}

function redirectHighScorePage(){
    Navigate('/highscore');
}

export default GameOverPage;