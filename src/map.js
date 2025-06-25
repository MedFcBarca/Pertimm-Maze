export let discoveredCells = [];

export function updateDiscovered(cells) {
  for (const cell of cells) {
    const idx = discoveredCells.findIndex(c => c.x === cell.x && c.y === cell.y);
    if (idx === -1) discoveredCells.push(cell);
    else discoveredCells[idx] = cell;
  }
}

export function printMaze(currentPos) {
  if (discoveredCells.length === 0) return;
  const maxX = Math.max(...discoveredCells.map(c => c.x));
  const maxY = Math.max(...discoveredCells.map(c => c.y));

  console.log("\nCarte du labyrinthe :");
  for (let y = 0; y <= maxY; y++) {
    let line = "";
    for (let x = 0; x <= maxX; x++) {
      if (x === currentPos.position_x && y === currentPos.position_y) {
        line += "🧍";
      } else {
        const cell = discoveredCells.find(c => c.x === x && c.y === y);
        if (!cell) line += " ";
        else {
          switch (cell.value) {
            case "wall": line += "🟥"; break;
            case "trap": line += "⚠️"; break;
            case "home": line += "🏠"; break;
            case "stop": line += "🏁"; break;
            case "path":
            default: line += "🟩"; break;
          }
        }
      }
    }
    console.log(line);
  }
  console.log("");
}
