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
