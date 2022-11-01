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