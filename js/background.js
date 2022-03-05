class Background {
  constructor(ctx, posX, posY, width, height) {
    //Constants
    this.ctx = ctx;

    //Size
    this.backgroundSize = { w: width, h: height };

    //Position
    this.backgroundPos = { x: posX, y: posY };

    //Velocity & acceleration
    this.backgroundSpeed = 6;

    //Loading image
    this.imageName = "background.png";
    this.imageBackground = new Image();
    this.imageBackground.src = `images/${this.imageName}`;
  }

  draw() {
    this.move();
    this.ctx.drawImage(
      this.imageBackground,
      this.backgroundPos.x,
      this.backgroundPos.y,
      this.backgroundSize.w,
      this.backgroundSize.h
    );
    this.ctx.drawImage(
      this.imageBackground,
      this.backgroundPos.x + this.backgroundSize.w,
      this.backgroundPos.y,
      this.backgroundSize.w,
      this.backgroundSize.h
    );
  }
  move() {
    if (this.backgroundPos.x <= -this.backgroundSize.w) {
      this.backgroundPos.x = 0;
    }
    this.backgroundPos.x -= this.backgroundSpeed;
  }
  stopBackground() {
    this.backgroundSpeed = 0;
  }
}
