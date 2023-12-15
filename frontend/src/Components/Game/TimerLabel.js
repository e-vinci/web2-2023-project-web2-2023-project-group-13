import Phaser from 'phaser';

const formatTimer = (timer) => `Timer: ${timer}`;

export default class TimerLabel extends Phaser.GameObjects.Text {
  constructor(scene, x, y, timer, style) {
    super(scene, x, y, formatTimer(timer), style);
    console.log('inside class', this.text);
    this.timer = timer;
  }

  setTimer(timer) {
    this.timer = timer;
    this.updateTimerText();
  }

  updateTimerText() {
    this.setText(formatTimer(this.timer)); // Update the text based on the timer value
  }
}