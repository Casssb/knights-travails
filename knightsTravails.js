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
  constructor([x, y], moves, route) {
    this.location = [x, y];
    this.moves = moves;
    this.route = route;
  }
}
/* create a board with cells containing a [false] value. This will be used
to make sure the BFS loop doesn't keep trying to select nodes that have already been
passed. */
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

/* uses the above 2 functions to return the only available moves based on the 
submitted co-ordinates */
const availableMoves = (board, loc) => {
  let moves = [
    [loc[0] + 2, loc[1] + 1],
    [loc[0] + 2, loc[1] - 1],
    [loc[0] + 1, loc[1] + 2],
    [loc[0] + 1, loc[1] - 2],
    [loc[0] - 1, loc[1] + 2],
    [loc[0] - 1, loc[1] - 2],
    [loc[0] - 2, loc[1] + 1],
    [loc[0] - 2, loc[1] - 1],
  ];
  let available = moves.filter((move) => {
    if (isWithinBounds(move) && checkTileOpen(board, move)) {
      return move;
    }
  });
  return available;
};

const knightTravails = (start, end) => {
  let currentBoard = createGameBoard();
  let queue = [new Node([start[0], start[1]], 0, [start[0], start[1]])];
  /* The BFS part */
  while (queue.length > 0) {
    let currentMove = queue.shift();
    let x = currentMove.location[0];
    let y = currentMove.location[1];
    /* This is here to check off every node on the current board to stop
    it being accessed more than once */
    currentBoard[x][y] = true;
    /* If we've found our end value we return it */
    if (
      currentMove.location[0] === end[0] &&
      currentMove.location[1] === end[1]
    ) {
      return currentMove;
    } else {
      /* If not we keep adding nodes to the queue using the available move checker
      setup earlier. We make sure each child node has it's parent nodes 'route' and
      'depth' incremented so that we can use these in the result */
      let available = availableMoves(currentBoard, currentMove.location);
      available.forEach((move) => {
        let node = new Node(
          [move[0], move[1]],
          currentMove.moves + 1,
          currentMove.route.concat([move])
        );
        queue.push(node);
      });
    }
  }
};

/* const board = createGameBoard();
console.log(board);
const tile = new Node([5, 5]);
console.log(tile.location[0]);
console.log(isWithinBounds(tile.location));
console.log(checkTileOpen(board, tile.location));
console.log(availableMoves(board, tile.location)); */
console.log(knightTravails([1, 1], [7, 7]));
console.log(knightTravails([7, 7], [0, 3]));
console.log(knightTravails([1, 6], [7, 2]));
