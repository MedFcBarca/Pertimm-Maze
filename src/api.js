import axios from "axios";
import qs from "qs"

export async function startGame(playerName) {
  const res = await axios.post(
    "https://hire-game-maze.pertimm.dev/start-game/",
    qs.stringify({ player: playerName }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  return res.data;
}

export async function discover(url) {
  const res = await axios.get(url);
  return res.data;
}

export async function move(url, x, y) {
  const res = await axios.post(
    url,
    qs.stringify({ position_x: x, position_y: y }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  return res.data;
}