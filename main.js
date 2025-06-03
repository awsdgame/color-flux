const gridSize = 9;
const grid = document.getElementById("grid");
const scoreEl = document.getElementById("score");

let prismColor = "red";
let score = 0;

const colors = ["red", "green", "blue"];
let cells = [];

function createGrid() {
  grid.innerHTML = "";
  cells = [];

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      grid.appendChild(cell);
      cells.push({ x, y, el: cell });
    }
  }

  updatePrism();
}

function updatePrism() {
 const centerIndex = Math.floor(gridSize / 2) * gridSize + Math.floor(gridSize / 2);
const center = cells[centerIndex];
center.el.classList.remove("prism", ...colors);
  center.el.classList.add("prism", prismColor);
}

function rotatePrism() {
  const index = colors.indexOf(prismColor);
  prismColor = colors[(index + 1) % colors.length];
  updatePrism();
}

function spawnBeam() {
  const sides = ["top", "bottom", "left", "right"];
  const side = sides[Math.floor(Math.random() * sides.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  let x, y;

  if (side === "top") {
    x = Math.floor(Math.random() * gridSize);
    y = 0;
  } else if (side === "bottom") {
    x = Math.floor(Math.random() * gridSize);
    y = gridSize - 1;
  } else if (side === "left") {
    x = 0;
    y = Math.floor(Math.random() * gridSize);
  } else {
    x = gridSize - 1;
    y = Math.floor(Math.random() * gridSize);
  }

  let currentX = x;
  let currentY = y;
  const dx = Math.sign(Math.floor(gridSize / 2) - x);
  const dy = Math.sign(Math.floor(gridSize / 2) - y);

  const interval = setInterval(() => {
    const cell = cells.find(c => c.x === currentX && c.y === currentY);
    if (!cell) return clearInterval(interval);

    cell.el.classList.add(color);

    setTimeout(() => cell.el.classList.remove(color), 700);

    if (currentX === Math.floor(gridSize / 2) && currentY === Math.floor(gridSize / 2)) {
      if (prismColor === color) {
        score++;
      } else {
        score--;
      }
      scoreEl.textContent = `Score: ${score}`;
      clearInterval(interval);
      return;
    }

    currentX += dx;
    currentY += dy;
  }, 150);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    rotatePrism();
  } else if (e.key ==="ArrowDown") {
    rotatePrism();
  }
});

createGrid();
setInterval(spawnBeam, 2000); // One beam every second
