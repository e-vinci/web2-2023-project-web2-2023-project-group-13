import { clearPage } from '../../utils/render';
// import Navigation
import Navigate from '../Router/Navigate';
// import images
import timerGif from '../../assets/Timer.gif'
import sky from '../../assets/sky.png';

const UniversalTimerPage = async () => {
  clearPage();
 // get main
 const main = document.querySelector("main");
 // get all scores sorted by time
 const table = await getBestScoreByTime();

 const content = `
 <div id="waterBackGround">
 <img id="waterImage" src="${sky}">
 <div id="timergif">
   <img id="timerImage" src="${timerGif}">
 </div>
 <div id="waterTextContainer">
   <h1>My High Scores By Timer</h1>
   ${table.map((score) => `
 <div class="timer">

    ${score.firstname} : Time : ${score.timer}s
 </div>
`).join('')}
 </div>

 <div id="scorePagesButtonContainer">
    <button id="backButton" class="retro-btn">GO BACK</button>
 </div>
</div>

`;
// display the table and the menu
main.innerHTML += content;
 // getters
 const backButton = document.querySelector('#backButton');
 // add EventListener
 backButton?.addEventListener('click',redirectToUniversalScoreMenu);
};
// function to get all the scores sorted by time
async function getBestScoreByTime(){
  const options = {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
    },
  };
  try {
  const response = await fetch(`${process.env.API_BASE_URL}/scores/getTimer`, options);

  if (!response.ok) {
    throw new Error(`Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
} catch (error) {
  console.error('Error user score:', error);
  return null;
}
}
// function to go back to the highscore page
function redirectToUniversalScoreMenu(){
  Navigate('/highscore');
}


export default UniversalTimerPage;