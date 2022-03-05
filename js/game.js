class Game {
  constructor() {
    //Constants
    this.ctx = undefined;
    this.keys = {
      left: "a",
      right: "d",
      up: "w",
    };

    //Size
    this.canvasSize = {
      w: undefined,
      h: undefined,
    };

    //Future instances && arrays of instances
    this.background = undefined;
    this.player = undefined;
    this.ship = undefined;

    this.obstacles = [];
    this.platforms = [];

    //Variables set to zero
    this.frames = 0;
    this.score = 0;
  }

  init() {
    this.canvas = document.getElementById(`canvas`);
    this.ctx = this.canvas.getContext(`2d`);
    this.setDimensions();
    this.startGame();
  }

  setDimensions() {
    this.canvasSize = {
      w: window.innerWidth,
      h: window.innerHeight,
    };
    this.canvas.setAttribute("width", this.canvasSize.w);
    this.canvas.setAttribute("height", this.canvasSize.h);
  }

  //Running the game
  startGame() {
    //Create the three objects
    this.createBackground();
    this.createPlayer();
    this.createShip();

    this.interval = setInterval(() => {
      this.drawAll();
      this.setEventListeners();
      this.moveAll();
      this.clearObstacle();
      this.clearPlatform();

      //How apart obstacles and platforms will be
      this.frames++;
      this.frames % 110 === 0 && this.createObstacle();
      this.frames % 125 === 0 && this.createPlatform();

      this.stopGame();
      //this.isPlatform();
      this.onPlatform();
      this.win();

      if (this.isCollision()) {
        this.gameOver();
        swal({
          title: "GAME OVER",
          text: "Your ship is gone!",
          icon: "warning",
        }).then(() => runAll);
      }
      this.isPlayerOut() && this.gameOver();
    }, 1400 / 60);
  }

  //Creating all the elements
  createBackground() {
    this.background = new Background(
      this.ctx,
      0,
      0,
      this.canvasSize.w,
      this.canvasSize.h
    );
  }

  createPlayer() {
    this.player = new Player(this.ctx, this.canvasSize);
  }

  createPlatform() {
    const platform1 = new Platforms(
      this.ctx,
      this.canvasSize,
      this.canvasSize.w,
      this.canvasSize.h - 170,
      150,
      150
    );
    if (this.score != 15) {
      this.platforms.push(platform1);
      this.score++;
    }
  }

  createObstacle() {
    const obstacle1 = new Obstacles(
      this.ctx,
      this.canvasSize,
      this.canvasSize.w,
      this.canvasSize.h - 150,
      105,
      105
    );
    this.score < 15 && this.obstacles.push(obstacle1);
  }

  clearObstacle() {
    this.obstacles = this.obstacles.filter(
      (obs) => obs.obstaclePos.x >= 0 - 200
    );
  }

  createShip() {
    this.ship = new Ship(
      this.ctx,
      this.canvasSize,
      this.canvasSize.w + 450,
      this.canvasSize.h - 450,
      350,
      425
    );
  }

  //Drawing the elements
  drawAll() {
    this.background.draw();
    this.player.draw();
    this.player.fall();
    this.obstacles.forEach((obs) => obs.draw());
    this.platforms.forEach((plat) => plat.draw());
    this.score >= 15 && this.ship.draw();
  }

  //Movement & controls
  moveAll() {
    this.obstacles.forEach((obs) => obs.move());
    this.platforms.forEach((plat) => plat.move());
    this.score >= 15 && this.ship.moveShip();
    this.backToFloor();
  }

  setEventListeners() {
    document.onkeydown = (e) => {
      if (e.key === this.keys.right) {
        this.player.move(30);
      }
      // } else if (e.key === this.keys.right) {
      //   this.player.move(30);
      // }
      if (e.key === this.keys.left) {
        this.player.move(-30);
      } else if (
        this.player.floor === this.player.posY &&
        e.key === this.keys.up
      ) {
        this.player.jump();
      }
    };
  }

  //Winning & losing
  isCollision() {
    return this.obstacles.some((obs) => {
      return (
        this.player.posX + this.player.width / 2 >= obs.obstaclePos.x &&
        this.player.posY + this.player.height - 60 >= obs.obstaclePos.y &&
        this.player.posX <= obs.obstaclePos.x + obs.obstacleSize.w - 90
      );
    });
  }

  win() {
    if (
      this.player.posX + this.player.width - 200 >= this.ship.shipPos.x &&
      this.player.posY + this.player.height >= this.ship.shipPos.y &&
      this.player.posX <= this.ship.shipPos.x + this.ship.shipSize.w
    )
      swal({
        title: "You win!",
        text: "You get to go back to Earth",
        icon: "success",
      }).then(() => {
        //this.gameOver();
        this.startGame();
      });
  }

  isPlayerOut() {
    if (this.player.posX < 0 - this.player.width) {
      swal("¡GAME OVER!Too slow!");
      return true;
    } else {
      return false;
    }
  }

  stopGame() {
    if (this.score >= 15) {
      this.background.stopBackground();
      this.ship.stop();
    }
  }

  clearPlatform() {
    this.platforms = this.platforms.filter(
      (plat) => plat.platformPos.x >= 0 - 400
    );
  }

  // isPlatform() {
  //   this.platforms.forEach((plat) => {
  //     if (
  //       this.player.posX + this.player.width / 2 >= plat.platformPos.x &&
  //       this.player.posY + this.player.height - 50 >= plat.platformPos.y &&
  //       this.player.posX + 50 <= plat.platformPos.x + plat.platformSize.w - 50
  //     ) {
  //       this.player.posX -= 10;
  //       return true;
  //     }
  //   });
  // }

  //Helpers
  onPlatform() {
    let result = undefined;
    this.platforms.forEach((plat) => {
      if (
        this.player.posX + this.player.width / 2 >= plat.platformPos.x &&
        this.player.posY + this.player.height >= plat.platformPos.y &&
        this.player.posX + 100 <= plat.platformPos.x + plat.platformSize.w
      ) {
        this.player.floor =
          this.canvasSize.h - plat.platformSize.h - this.player.height - 10;
        result = true;
      } else {
        result = false;
      }
    });
    return result;
  }

  backToFloor() {
    if (this.onPlatform() == false) {
      this.player.floor = this.canvasSize.h - this.player.height - 20;
    }
  }

  //Ending game
  gameOver() {
    clearInterval(this.interval);
  }
}

const game = new Game();
