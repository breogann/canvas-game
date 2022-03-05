class Player {
  constructor(ctx, canvasSize) {
    //Constants
    this.ctx = ctx;
    this.canvasSize = canvasSize;

    //Size
    this.width = 300;
    this.height = 300;

    //Position
    this.posX = 5;
    this.posY = this.canvasSize.h - this.height - 20;
    this.floor = this.posY;

    //Velocity & acceleration
    this.velY = 2;
    this.velX = 8;

    this.gravity = 1;
    this.gravitySpeed = 0;

    //Loading image
    this.imageName = "player.png";
    this.playerInstance = new Image();
    this.playerInstance.src = `images/${this.imageName}`;
  }

  draw() {
    this.ctx.drawImage(
      this.playerInstance,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
  move(distance) {
    this.posX += distance;
  }

  jump() {
    this.posY -= 150;
    this.velY -= 15;
  }

  fall() {
    if (this.posY < this.floor) {
      this.posY += this.velY;
      this.velY += this.gravity;
    } else {
      this.posY = this.floor;
      this.velY = 1;
    }
  }
}
