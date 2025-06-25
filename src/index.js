import { PLAYER_NAME } from "./constants.js";
import { startGame } from "./api.js";
import { updateDiscovered, printMaze } from "./map.js";
import { backtracking } from "./solver.js";

console.log(`🎮 Démarrage de la partie avec le joueur : ${PLAYER_NAME}`);
const startPos = await startGame(PLAYER_NAME);
if (startPos.dead) {
  console.log("☠️ Mort dès le départ !");
  process.exit(1);
}

updateDiscovered([{ x: startPos.position_x, y: startPos.position_y, value: "home", move: true }]);
printMaze(startPos);

const found = await backtracking(startPos);

console.log(found ? "✅ Jeu terminé avec succès !" : "❌ Impossible de trouver la sortie...");
