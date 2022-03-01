class Background {
  constructor(Game, x, y, imageUrl) {
    this.position = { x, y };
    this.imageInstance = new Image();
    this.imageInstance.src = imageUrl;
    this.width = this.imageInstance.width;
    this.height = 20;
    this.game = Game;
  }

  draw() {
    this.width = this.imageInstance.width;
    this.game.ctx.drawImage(
      this.imageInstance,
      this.position.x,
      this.position.y
    );
  }
}
