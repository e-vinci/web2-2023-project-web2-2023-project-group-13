import { clearPage } from '../../utils/render';
// import Navigation
import Navigate from '../Router/Navigate';
// import images
import water from "../../assets/water.png";

const personnalFish = async () => {
  clearPage();
  // get main
  const main = document.querySelector('main');
  const table = await getUserScoreByFish();
  const content= `
    <div id="waterBackGround">
      <img id="waterImage" src="${water}">
      </div>
      <div id="waterTextContainer">
        <h1>My High Scores By Fish</h1>
        ${table.map((score) => `
      <div class="timer">
         ${score.fish} fish
      </div>
    `).join('')}
      </div>
      <div id="scorePagesButtonContainer">
         <button id="backButton" class="retro-btn">GO BACK</button>
      </div>
    </div>
    
   `;
  // add menu
  main.innerHTML += content;
  const backButton = document.querySelector('#backButton');
  // add EventListener
  backButton?.addEventListener('click',redirectToUniversalScoreMenu);
};

// function to get the scores of the user sorted by fish
async function getUserScoreByFish(){
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
  const response = await fetch(`${process.env.API_BASE_URL}/scores/getUserFish`, options);

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
// function to go back to the personnal score page
function redirectToUniversalScoreMenu(){
  Navigate('/personnal');
}

export default personnalFish;