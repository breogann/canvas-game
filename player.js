const gravity = 3;

class Player {
  constructor(game) {
    this.position = { x: 200, y: 100 };
    this.velocity = { x: 0, y: 0 };
    this.width = 30;
    this.height = 30;

    this.game = game;
  }

  draw() {
    this.game.ctx.fillStyle = "red";
    this.game.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.update();
  }

  update() {
    if (this.position.y > 30) {
      this.position.y += this.velocity.y;
      this.position.x += this.velocity.x;
      console.log(this.position.y);
    }

    //this.game.checkForCollision();

    //if the character is above the bottom frame (937), bring it down, otherwise stop it
    if (
      this.position.y + this.height <=
      this.game.gameSize.h - this.height * 3
    ) {
      console.log("Square is above the frame");
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}
