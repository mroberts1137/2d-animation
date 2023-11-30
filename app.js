const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);
const TICK_SPEED = 5;
let gameFrame = 0;

const playerImage = new Image();
playerImage.src = 'assets/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let playerState = 'idle';
const animationDropdown = document.querySelector('#animations');
animationDropdown.addEventListener('change', (e) => {
  playerState = e.target.value;
});

const spriteAnimations = [];
const animationStates = [
  {
    name: 'idle',
    frames: 6
  },
  {
    name: 'jump',
    frames: 6
  },
  {
    name: 'fall',
    frames: 6
  },
  {
    name: 'run',
    frames: 8
  },
  {
    name: 'dizzy',
    frames: 10
  },
  {
    name: 'sit',
    frames: 4
  },
  {
    name: 'roll',
    frames: 6
  },
  {
    name: 'bite',
    frames: 6
  },
  {
    name: 'dead',
    frames: 12
  },
  {
    name: 'getHit',
    frames: 4
  }
];
/* calculate sprite positions in sprite sheet:
animationStates = [
  loc: [{
    x: 0,
    y: 0
  },
  {
    x: 575,
    y: 0
  },
  {
    x: 1150,
    y: 0
  }]
]
*/
animationStates.forEach((state, index) => {
  let frames = {
    loc: []
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
//console.log(spriteAnimations);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let animationFrame =
    Math.floor(gameFrame / TICK_SPEED) %
    spriteAnimations[playerState].loc.length;
  let frameX = spriteAnimations[playerState].loc[animationFrame].x;
  let frameY = spriteAnimations[playerState].loc[animationFrame].y;

  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
