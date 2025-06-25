import { discover, move } from "./api.js";
import { updateDiscovered, printMaze } from "./map.js";

export async function backtracking(position, visited = new Set(), pathStack = []) {
  const key = `${position.position_x},${position.position_y}`;
  if (visited.has(key)) return false;
  visited.add(key);

  if (position.win) return true;
  if (position.dead) return false;

  const surroundings = await discover(position.url_discover);
  updateDiscovered(surroundings);
  printMaze(position);
  surroundings.sort((a, b) => (a.x + a.y) - (b.x + b.y));

  for (const cell of surroundings) {
    if (!cell.move || cell.value === "trap") continue;
    const cellKey = `${cell.x},${cell.y}`;
    if (visited.has(cellKey)) continue;

    const nextPos = await move(position.url_move, cell.x, cell.y);
    console.log(`➡️ Déplacement en (${cell.x},${cell.y}) - Case : ${cell.value}`);

    if (nextPos.dead) continue;
    if (nextPos.win) return true;

    pathStack.push(position);
    if (await backtracking(nextPos, visited, pathStack)) return true;

    const prevPos = pathStack.pop();
    await move(nextPos.url_move, prevPos.position_x, prevPos.position_y);
    console.log(`⬅️ Retour en (${prevPos.position_x},${prevPos.position_y})`);
  }
  return false;
}
