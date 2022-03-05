const screen = document.getElementById("start-screen");
const endscreen = document.getElementById("end-screen");

document.getElementById("end-screen").style.display = "none";

function runAll() {
  window.onload = () => {
    document.getElementById("start-easy").onclick = () => {
      const level = "easy";
      const game = new Game(level);
      document.getElementById("auto").style.display = "none";
      const sound = document.getElementById("audio");
      sound.play();
      game.init(level);
    };

    document.getElementById("start-difficult").onclick = () => {
      const level = "difficult";
      const game = new Game(level);
      document.getElementById("auto").style.display = "none";
      const sound = document.getElementById("audio");
      sound.play();
      game.init(level);
    };
  };
}

runAll();

document.getElementById("restart").addEventListener("click", (e) => {
  // this.game.reset();
  document.getElementById("auto").style.display = "block";
  //document.getElementById("play").style.display = "block";
  document.getElementById("end-screen").style.display = "none";
  runAll();
});
