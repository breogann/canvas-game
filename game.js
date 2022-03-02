const images = {
  platform: new Image(),
  background: new Image(),
  hill: new Image(),
  player: new Image(),
};

images.platform.src = "./img/platform.png";
images.background.src = "./img/background.png";
images.hill.src = "./img/hills.png";

let scrollOffset = 0;

class Game {
  constructor(image) {
    this.platforms = [];
    this.backgrounds = [];
    this.player = new Player(this, image);
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.keys = {
      right: { pressed: false },
      left: { pressed: false },
    };
    this.gameSize = {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  }

  init() {
    this.setDimensions(); //define canvas dimensions
    this.createBackground();
    this.createPlatforms(); //define platforms
    this.drawAll(); //draw both background and platforms
    this.movePlayer();
    this.start(); //start the loop & update position
  }

  setDimensions() {
    this.canvas.width = this.gameSize.w;
    this.canvas.height = this.gameSize.h;
  }

  createBackground() {
    this.backgrounds = [
      new Background(this, 0, 0, images.background),
      new Background(this, -1, -1, images.hill),
    ];
  }

  createPlatforms() {
    this.platforms = [
      new Platform(this, 0, canvas.height - 100, images.platform),
      new Platform(this, 800, canvas.height - 100, images.platform),
    ];
  }

  drawAll() {
    this.backgrounds.forEach((elm) => elm.draw());
    this.platforms.forEach((elm) => elm.draw());
    this.player.draw();
  }

  start() {
    window.requestAnimationFrame(() => {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h);

      this.drawAll();
      this.enableControls();
      this.movePlayer();
      this.checkForCollision();
      this.start();
    });
  }

  enableControls() {
    addEventListener("keydown", ({ keyCode }) => {
      switch (keyCode) {
        case 65: //a key
        case 37: //left arrow
          console.log("left");
          this.keys.left.pressed = true;
          break;

        case 83: //s key
        case 40: //down key
          console.log("down");
          break;

        case 68: //d key
        case 39: //right arrow
          console.log("right");
          this.keys.right.pressed = true;
          break;

        case 87: //w key
        case 38: //up key
          console.log("up");
          this.player.velocity.y -= 0.5;
          break;
      }
    });

    addEventListener("keyup", ({ keyCode }) => {
      //keyup fires when key is released
      switch (keyCode) {
        case 65: //a key
        case 37: //left arrow
          console.log("left");
          this.keys.left.pressed = false;
          break;

        case 83: //s key
        case 40: //down key
          console.log("down");
          break;

        case 68: //d key
        case 39: //right arrow
          console.log("right");
          this.keys.right.pressed = false;
          break;

        case 87: //w key
        case 38: //up key
          console.log("up");
          this.player.velocity.y += 0;
          break;
      }
    });
  }

  movePlayer() {
    this.platforms.forEach((platform) => {
      if (this.keys.right.pressed && this.player.position.x < 400) {
        this.player.velocity.x = 5;
      } else if (
        this.keys.left.pressed &&
        this.player.position.x > canvas.width
      ) {
        this.player.velocity.x = -5;
      } else {
        this.player.velocity.x = 0;
        if (this.keys.right.pressed) {
          scrollOffset += 5;
          platform.position.x -= 5;
          this.platforms[0].position.x -= 2; //parallax effect on hills
        } else if (this.keys.left.pressed) {
          scrollOffset -= 5;
          platform.position.x += 5;
          this.platforms[0].position.x += 2; //parallax effect on hills
        }
      }
    });
  }

  winOrLose() {
    if (scrollOffset > 2000) {
      console.log("You win");
    } else if (this.player.position.y + this.player.height >= 544) {
      console.log("you lose");
      this.init();
    }
  }

  checkForCollision() {
    console.log("CHECKING FOR COLLISION");
    this.platforms.forEach((platform) => {
      if (
        //if character is RIGHT on the same height as platform
        this.player.position.y + this.player.height <= platform.position.y &&
        this.player.position.y + this.player.height + this.player.velocity.y >=
          platform.position.y &&
        //if character is ON platform: it's position+width is between the width of the platform
        this.player.position.x + this.player.width >= platform.position.x &&
        this.player.position.x <= platform.position.x + platform.width
      ) {
        this.player.velocity.y = 0;
      }
    });
  }
}
const game = new Game();

game.init();
