import { clearPage } from '../../utils/render';
// import navigation
import Navigate from '../Router/Navigate';
// import images
import sky from '../../assets/sky.png';
import sun from '../../assets/sun.png';
import ground from '../../assets/longGround.png';
import catio from '../../assets/Catio.png';
import cloud01 from '../../assets/cloud1.png';
import cloud02 from '../../assets/cloud2.png';
import cloud03 from '../../assets/cloud3.png';
import cloud04 from '../../assets/cloud4.png';

const PersonnalScorePage = () => {
  clearPage();
  clearPage();
  // get main
  const main = document.querySelector('main');
  // add menu to main
  main.innerHTML += renderContent();
  // get buttons
  const timerButton = document.querySelector('#timerButton');
  const fishButton = document.querySelector('#fishButton');
  const backButton = document.querySelector('#backButton');
  // add eventListener to the buttons
  timerButton?.addEventListener('click',redirectToTimerPage);
  fishButton?.addEventListener('click',redirectToFishPage);
  backButton?.addEventListener('click',redirectBack);
};

function renderContent(){

  const content = `
    <div id="skyContainer">
      <img id="skyImage" src="${sky}">
      <div id="groundContainer">
        <img id="groundImage" src="${ground}">
      </div>
      <div id="textContainer">
        <h1 id="pageTitle">
            BEST PERSONNAL SCORES
        </h1>
      </div>
      <div id="catioContainer">
        <img id="catioImage" src="${catio}">
      </div>
      <div id="cloud02Container">
        <img id="cloud02Image" src="${cloud02}">
      </div>
      <div id="cloud01Container">
        <img id="cloud01Image" src="${cloud01}">
      </div>
      <div id="cloud03Container">
        <img id="cloud03Image" src="${cloud03}">
      </div>
      <div id="sunContainer">
        <img id="sunImage" src="${sun}">
      </div>
      <div id="cloud04Container">
        <img id="cloud04Image" src="${cloud04}">
      </div>
      <div id="buttonContainer">
        <button id="timerButton" class="retro-btn">TIMER</button>
        <br>
        <button id="fishButton" class="retro-btn">FISH</button>
        <br>
        <button id="backButton" class="retro-btn">GO BACK</button>
        <br>
    </div>
  `;
  return content;
}

function redirectToTimerPage(){
  Navigate('/personnalTimer');
}

function redirectToFishPage(){
  Navigate('/personnalFish');
}

function redirectBack(){
  Navigate('/highscore');
}

export default PersonnalScorePage;
