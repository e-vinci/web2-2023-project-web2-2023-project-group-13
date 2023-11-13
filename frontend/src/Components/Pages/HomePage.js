const HomePage = () => {
  const main = document.querySelector('main');

  // Create a button element
    // Play button
  const playButton = document.createElement('button');
  playButton.textContent= 'PLAY';
  playButton.className = 'retro-btn';

  // Help button
  const helpButton = document.createElement('button');
  helpButton.textContent= 'HELP';
  helpButton.className = 'retro-btn';

  // High Scores button
  const scoresButton = document.createElement('button');
  scoresButton.textContent= 'HIGH SCORES';
  scoresButton.className = 'retro-btn';

  // Connect button
  const connectButton = document.createElement('button');
  connectButton.textContent= 'CONNECT';
  connectButton.className = 'retro-btn';

  // Sign in button
  const signInButton = document.createElement('button');
  signInButton.textContent= 'SIGN IN';
  signInButton.className = 'retro-btn';

  // Append the button to the main element
  main.appendChild(playButton);
  main.appendChild(helpButton);
  main.appendChild(scoresButton);
  main.appendChild(connectButton);
  main.appendChild(signInButton);
};

export default HomePage;
