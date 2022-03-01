class Platform {
  constructor(game, x, y, imageInstance) {
    this.position = { x, y };

    // this.imageInstance = new Image();
    // this.imageInstance.src = imageUrl;
    this.imageInstance = imageInstance;

    this.game = game;
  }

  draw() {
    console.log(this.game);
    this.game.ctx.drawImage(
      this.imageInstance,
      this.position.x,
      this.position.y,
      this.imageInstance.width,
      this.imageInstance.height
    );
  }
}
