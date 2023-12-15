import { clearPage } from '../../utils/render';
// import Navigation
import Navigate from '../Router/Navigate';
// import images
import timerGif from '../../assets/Timer.gif'
import sky from '../../assets/sky.png';

const PersonnalTimer = async () => {
  clearPage();
  const main = document.querySelector("main");
  // get the scores of the user sorted by time
  const table = await getUserScoreByTime();
  
  
   const content= `
    <div id="waterBackGround">
      <img id="waterImage" src="${sky}">
      <div id="timergif">
        <img id="timerImage" src="${timerGif}">
      </div>
      <div id="waterTextContainer">
        <h1>My High Scores By Timer</h1>
        ${table.map((score) => `
      <div class="timer">
         ${score.timer}s
      </div>
    `).join('')}
      </div>
     
      <div id="scorePagesButtonContainer">
         <button id="backButton" class="retro-btn">GO BACK</button>
      </div>
    </div>
    
   `;
// get the menu
main.innerHTML += content;
// getters
const backButton = document.querySelector("#backButton");
// EventListener
backButton.addEventListener('click', redirectToUniversalScoreMenu);
}
// function to get all the scores of the user sorted by time
 async function getUserScoreByTime(){
  // get the email of the user
  const email = localStorage.getItem('email');
  const options = {
    method: 'POST',
    body: JSON.stringify({
      email
    }),
    headers:{
      'Content-Type': 'application/json',
    },
  };
  try {
  const response = await fetch('http://localhost:3000/scores/getUserTimer', options);
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
// function to go back to the personnal scores page
function redirectToUniversalScoreMenu(){
   Navigate('/personnal');
 }
export default PersonnalTimer;