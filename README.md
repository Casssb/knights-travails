# Knights-Travails

The task was to build a function `knightMoves` that shows the shortest possible way to get from one square on a chessboard to another by outputting all squares the knight will stop on along the way.

A knight in chess can move to any square on the standard 8x8 chess board from any other square on the board. Its basic move is two steps forward and one step to the side. It can face any direction.

All the possible places you can end up after one move look like this:

![Image of knight moves](board.PNG)

My solution to this puzzle uses the following functions:

`Node` this is effectively the 'knight' constructor. It has the properties `location`, `moves` and `route`. A node is created for every possible move and keeps track of the previous moves (using `route`) and depth (using `moves`)

`createGameBoard` this is effectively a `set()`. It creates an 8X8 grid (chessboard) and is used during the final BFS function to prevent revisiting tiles. After I'd finished writing the solution I realised I could have just used the inbuilt JS `set()` object but decided to leave it as is for illustrative purposes (also laziness)

`checkTileOpen` takes in the gameboard and potential moves as arguments and returns `true` if the tile has not been used. It's just a filter to make sure moves are not repeated

`isWithinBounds` the final part of the filter logic. Makes sure no potential move can be made outside of the 8X8 grid

`availableMoves` uses the above 3 functions to return `Node` objects which are the potential moves used to create the graph structure. This is the key to the search method below

`knightMoves` takes in the start/end coordinates and forms a breadth first search. The first `Node` is added to a queue after being passed the initial coordinates. It is also passed the starting depth (0) and step 1 of the potential route (initial coordinates).
The `availableMoves` function is then used to enqueue all the potential 'second' move `Node`'s (dequeuing the first move `Node`) and so-on. Every time a 'layer' of moves is added to the queue the dequeued `Node` has it's `moves` incremented and another set of coordinates concatenated onto it's `route`.
This logic will continue until one of the `Node` object's `location` is equal to the end coordinates submitted to the `knightMoves` function (or until there are no more `Node`'s in the queue- meaning the entire matrix has been searched)