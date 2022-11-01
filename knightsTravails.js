/* Initial plan:
 1- create an 8X8 matrix filled with either 0/null or the relative tile pos
 (like [x4y4], [x2y7] etc.
 2- create a node class/factory which returns a 2d value (x/y pos) and a parent
 link slot. Could possible store the knights starting space and end goal.
 3- create a function to make sure the knight cannot go out of bounds (x & y moves 
    0-7)
 4- Create a function to store all the possible knight move offsets (e.g x2 y1) 
 5- create a bfs function that uses a queue to sort through each of the paths the knight
 could take and find the shortest depth. This will need an array of 'results' filled
 with nodes from the node factory compared againts all the possible move offsets
 6- After thinking through my logic I'm not sure I'll even need to create a matrix. if I can
 have a starting position (i.e [x0,y0]) and an end position (say [x4y4]) then I
 only really need to create a queue and use the offset logic to work out depth.*/

class Node {
  constructor([x, y], parent = null) {
    this.location = [x, y];
    this.parent = parent;
  }
}
/* create a board with cells containing a [false] value */
const createGameBoard = () => {
  const gameBoard = [];
  for (let i = 0; i <= 7; i++) {
    gameBoard[i] = [];
    for (let j = 0; j <= 7; j++) {
      gameBoard[i][j] = false;
    }
  }
  return gameBoard;
};

/* make sure the tile is empty [false] */
const checkTileOpen = (board, loc) => {
  const x = loc[0];
  const y = loc[1];
  return !board[x][y];
};

/* make sure the suggested move is with 0-7x 0-7y bounds */
const isWithinBounds = (loc) => {
  if (loc[0] < 0 || loc[0] > 7 || loc[1] < 0 || loc[1] > 7) {
    return false;
  } else {
    return true;
  }
};

const availableMoves = (loc) => {};

const board = createGameBoard();
console.log(board);
const tile = new Node([7, 3]);
console.log(tile.location[0]);
console.log(isWithinBounds(tile.location));
console.log(checkTileOpen(board, tile.location));
