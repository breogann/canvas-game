const Game = {
  keys: {
    right: { pressed: false },
    left: { pressed: false },
  },
  platforms: [],
  backgrounds: [],
  player: new Player(),
  images: {
    platform: "./img/platform.png",
    background: "./img/background.png",
    hill: "./img/hills.png",
  },
  canvas: document.querySelector("canvas"),
  ctx: this.canvas.getContext("2d"),
  gameSize: {
    w: window.innerWidth,
    h: window.innerHeight,
  },

  init() {
    this.setDimensions(); //define canvas dimensions
    this.createPlatforms(); //define platforms
    this.createBackground(); //define the background
    this.drawAll(); //draw both background and platforms
    this.start(); //start the loop & update position
    this.movePlayer();
    this.checkForCollision();
  },

  setDimensions() {
    this.canvas.width = this.gameSize.w;
    this.canvas.height = this.gameSize.h;
  },

  createPlatforms() {
    this.platforms = [
      new Platform({
        x: 0,
        y: canvas.height - 100,
        imageUrl: this.images.platform,
      }),
      new Platform({
        x: 800,
        y: canvas.height - 100,
        imageUrl: this.images.platform,
      }),
    ];
  },

  createBackground() {
    this.backgrounds = [
      new Background({ x: 0, y: 0, imageUrl: this.images.hill }),
      new Background({ x: -1, y: -1, imageUrl: this.images.background }),
    ];
  },

  drawAll() {
    this.platforms.forEach((elm) => elm.draw());
    this.backgrounds.forEach((elm) => elm.draw());
    this.player.draw();
  },

  start() {
    requestAnimationFrame(this.start());
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h);

    this.drawAll();
    this.enableControls();
    this.movePlayer();
  },

  enableControls() {
    addEventListener("keydown", ({ keyCode }) => {
      switch (keyCode) {
        case 65: //a key
        case 37: //left arrow
          console.log("left");
          keys.left.pressed = true;
          break;

        case 83: //s key
        case 40: //down key
          console.log("down");
          break;

        case 68: //d key
        case 39: //right arrow
          console.log("right");
          keys.right.pressed = true;
          break;

        case 87: //w key
        case 38: //up key
          console.log("up");
          player.velocity.y -= 20;
          break;
      }
    });

    addEventListener("keyup", ({ keyCode }) => {
      //keyup fires when key is released
      switch (keyCode) {
        case 65: //a key
        case 37: //left arrow
          console.log("left");
          keys.left.pressed = false;
          break;

        case 83: //s key
        case 40: //down key
          console.log("down");
          break;

        case 68: //d key
        case 39: //right arrow
          console.log("right");
          keys.right.pressed = false;
          break;

        case 87: //w key
        case 38: //up key
          console.log("up");
          player.velocity.y -= 5;
          break;
      }
    });
  },

  movePlayer() {
    platforms.forEach((platform) => {
      if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5;
      } else if (keys.left.pressed && player.position.x > canvas.width) {
        player.velocity.x = -5;
      } else {
        player.velocity.x = 0;
        if (keys.right.pressed) {
          scrollOffset += 5;
          platform.position.x -= 5;
          platforms[0].position.x -= 2; //parallax effect on hills
        } else if (keys.left.pressed) {
          scrollOffset -= 5;
          platform.position.x += 5;
          platforms[0].position.x += 2; //parallax effect on hills
        }
      }
    });
  },

  winOrLose() {
    if (scrollOffset > 2000) {
      console.log("You win");
    } else if (player.position.y + player.height >= 544) {
      console.log("you lose");
      this.init();
    }
  },

  checkForCollision() {
    platforms.forEach((platform) => {
      if (
        //if character is RIGHT on the same height as platform
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >=
          platform.position.y &&
        //if character is ON platform: it's position+width is between the width of the platform
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
      ) {
        player.velocity.y = 0;
      }
    });
  },
};

console.log(Game.canvas);

Game.init();
