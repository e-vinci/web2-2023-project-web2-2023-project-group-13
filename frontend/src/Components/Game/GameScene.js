import Phaser from 'phaser';
import cadreAsset from '../../assets/cadre.png';
import ScoreLabel from './ScoreLabel';
import BombSpawner from './BombSpawner';
import skyAsset from '../../assets/sky.png';
import platformAsset from '../../assets/platform.png';
import starAsset from '../../assets/star.png';
import bombAsset from '../../assets/bomb.png';
import dudeAsset from '../../assets/dude.png';
import buissonAsset from '../../assets/buisson.png';
import flecheAsset from '../../assets/fleche_haut.png';
import poissonAsset from '../../assets/poisson.png';
import catAsset from '../../assets/catio.png';


const GROUND_KEY = 'ground';
const DUDE_KEY = 'dude';
const STAR_KEY = 'star';
const BOMB_KEY = 'bomb';
const CADRE_KEY = 'cadre';


class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.scoreLabel = undefined;
    this.stars = undefined;
    this.bombSpawner = undefined;
    this.gameOver = false;
  }

  preload() {
    this.load.image('sky', skyAsset);
    this.load.image(GROUND_KEY, platformAsset);
    this.load.image(STAR_KEY, starAsset);
    this.load.image(BOMB_KEY, bombAsset);
    this.load.image(CADRE_KEY,cadreAsset);
    this.load.image('poisson', poissonAsset);
  this.load.image('buisson', buissonAsset);
  this.load.image('fleche', flecheAsset);
  this.load.image('chat',catAsset);

    this.load.spritesheet(DUDE_KEY, dudeAsset, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, 'sky');
    this.showInstructions();
    const platforms = this.createPlatforms();
    this.player = this.createPlayer();
    this.stars = this.createStars();
    this.scoreLabel = this.createScoreLabel(16, 16, 0);
    this.bombSpawner = new BombSpawner(this, BOMB_KEY);
    const bombsGroup = this.bombSpawner.group;
    this.physics.add.collider(this.stars, platforms);
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(bombsGroup, platforms);
    this.physics.add.collider(this.player, bombsGroup, this.hitBomb, null, this);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();

    /* The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision... */
  }


  showInstructions() {
    // Ajoutez le cadre en premier plan
    const cadre = this.add.sprite(400, 300, CADRE_KEY);
  
    // Ajustez la largeur et la hauteur du cadre ici si nécessaire
    const scaleX = 800 / cadre.width;
    const scaleY = 600 / cadre.height;
    cadre.setScale(scaleX, scaleY);
  
   // Ajoutez les images au cadre
  const poisson = this.add.image(cadre.x - cadre.displayWidth / 2 + 150, cadre.y - cadre.displayHeight / 2 + 150, 'poisson');
  const buisson = this.add.image(poisson.x + poisson.displayWidth + 70, cadre.y - cadre.displayHeight / 2 + 150, 'buisson');
  const fleche = this.add.image(buisson.x + buisson.displayWidth + 70, cadre.y - cadre.displayHeight / 2 + 150, 'fleche');
  const chat = this.add.image(fleche.x + fleche.displayWidth + 90, cadre.y - cadre.displayHeight / 2 + 150, 'chat');
    // Ajoutez le texte pour chaque image
    const style = { font: '20px Arial', fill: '#000' };
    const poissonText =this.add.text(poisson.x, poisson.y + poisson.displayHeight / 2 + 10, 'Points', style).setOrigin(0.5);
    const buissonText=this.add.text(buisson.x, buisson.y + buisson.displayHeight / 2 + 10, 'Danger', style).setOrigin(0.5);
    const flecheText=this.add.text(fleche.x, fleche.y + fleche.displayHeight / 2 + 15, 'Jump', style).setOrigin(0.5);
    const chatText =this.add.text(chat.x, chat.y + chat.displayHeight / 2 + 10, 'Main Character', style).setOrigin(0.5);
  
    // Ajoutez le texte dans le cadre
    const instructionsText = `
    Welcome to Catio!

    Instructions:
    - Press the up arrow key to make the cat jump.
    - Collect as many fish as possible to score points.
    - Avoid obstacles and try to stay alive as long as you can.
    
    Have a good time!
    
    `;
  
    // Calculez la position du texte en fonction de la position du cadre
    const textX = cadre.x - cadre.displayWidth / 2 + 70;
    const textY = cadre.y - cadre.displayHeight / 2 + 200; // déplace le texte plus bas
  
    const text = this.add.text(textX, textY, instructionsText, style);
  
    // Ajoutez un bouton "OK" dans le cadre
    const okButton = this.add.text(cadre.x, text.y + text.displayHeight +30, 'OK', { fontSize: '24px', fill: '#000', backgroundColor: '#ddd', padding: { x: 10, y: 5 } })
      .setOrigin(0.5)
      .setInteractive(); // Permet d'ajouter des événements interactifs
  
    // Ajoutez un gestionnaire d'événements pour le bouton "OK"
    okButton.on('pointerdown', () => {
      cadre.destroy();
      text.destroy();
      okButton.destroy();
      poisson.destroy();
      buisson.destroy();
      fleche.destroy();
      chat.destroy();
      poissonText.destroy();
      buissonText.destroy();
      chatText.destroy();
      poissonText.destroy();
      flecheText.destroy();

    });
  }
  
  


  update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();

    platforms
      .create(400, 568, GROUND_KEY)
      .setScale(2)
      .refreshBody();

    platforms.create(600, 400, GROUND_KEY);
    platforms.create(50, 250, GROUND_KEY);
    platforms.create(750, 220, GROUND_KEY);
    return platforms;
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 450, DUDE_KEY);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    /* The 'left' animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second.
    The 'repeat -1' value tells the animation to loop.
    */
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: DUDE_KEY, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    return player;
  }

  createStars() {
    const stars = this.physics.add.group({
      key: STAR_KEY,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    return stars;
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.scoreLabel.add(10);
    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });
    }

    this.bombSpawner.spawn(player.x);
  }

  createScoreLabel(x, y, score) {
    const style = { fontSize: '32px', fill: '#000' };
    const label = new ScoreLabel(this, x, y, score, style);
    console.log('score:', label);
    this.add.existing(label);

    return label;
  }

  hitBomb(player) {
    this.scoreLabel.setText(`GAME OVER : ( \nYour Score = ${this.scoreLabel.score}`);
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
  }
}

export default GameScene;
