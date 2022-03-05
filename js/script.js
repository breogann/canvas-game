//export function runAll()
function runAll() {
  window.onload = () => {
    document.getElementById("start-button").onclick = () => {
      document.getElementById("auto").style.display = "none";
      const sound = document.getElementById("audio");
      sound.play();
      game.init();
    };
  };
}

runAll();
