const gravity = 1.5;

class Player {
  constructor() {
    this.position = { x: 200, y: 100 };
    this.velocity = { x: 0, y: 0 };

    this.width = 30;
    this.height = 30;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.update();
  }

  update() {
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    //if the character is above the bottom frame, bring it down, otherwise stop it
    if (
      this.position.y + this.height <= canvas.height - this.height / 2 ||
      this.position.y <= 0
    ) {
      console.log("Square is above the frame");
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}
