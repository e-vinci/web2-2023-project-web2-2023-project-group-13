import Phaser from 'phaser';

const formatTimer = (timer) => `Timer: ${timer}`;

export default class TimerLabel extends Phaser.GameObjects.Text {
  constructor(scene, x, y, score, style) {
    super(scene, x, y, formatTimer(timer), style);
    console.log('inside class', this.text);
    this.timer = timer;
  }

  setTimer(timer) {
    this.timer = timer;
    this.updateTimerText();
  }

  add(seconds) {
    this.setTimer(this.timer + seconds);
  }

  updateTimerText() {
    this.setText(formatTimer(this.score));
  }
}
