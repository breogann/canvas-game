const keys = {
  right: {
    pressed: false,
  },

  left: {
    pressed: false,
  },
};

let scrollOffset = 0;


//Loading pictures
const platformImageUrl = "./img/platform.png"
const backgroundImageUrl = "./img/background.png"
const hillImagerUrl = "./img/hill.png"


// Create objects, either background, character, etc.
function createImage(imageSrc) {
  const image = new Image()
  image.src = imageSrc
  return image
}


//Arrays for variable declaration
let genericObjectArray = [
  new genericObject({x: 0, y: 0, image: createImage(backgroundImageUrl)}),
]

let platforms = [
  new Platform({x: -1, y: canvas.height - 100, imageUrl: "./img/platform.png"}),
  new Platform({x: 800, y: canvas.height - 300, imageUrl: "./img/platform.png" }),
];


//Iterating to draw the elements on the arrayss
genericObjectArray.forEach(genericObject => {
  genericObjectArray[0].draw()
})

platforms.forEach(genericObject => {
  genericObject.draw()
})


//Running the whole thing
function animate() {
  requestAnimationFrame(animate);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  platforms.forEach((platform) => {
    platform.draw();
  });

  player.update();

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
      } else if (keys.left.pressed) {
        scrollOffset -= 5;
        platform.position.x += 5;
      }
    }
  });

  //COLLISION: character & platform
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
  console.log(scrollOffset)
  
  if (scrollOffset > 2000) {
    console.log("You win");
  }
}


animate()


   
// CONTROLS
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65: //a key
    case 37: //left arrow
      console.log("left");
      keys.left.pressed = true;
      break;

    case 83: //s key
    case 40: //down key
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
    case 40: //down key
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