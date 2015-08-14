function shift()
{
    for (var i = board.length - 1; i >= 0; i--) 
    {
        //if all cubes in column are popped
        if (AllCubesInColumnArePopped(i)) 
            {
                var cubesToMoveOver = CubesInColumnsLeftOf(i);
                MoveCubesOver(cubesToMoveOver);
            };
        //move all columns to the left to the right one.

        for (var j = board[0].length - 1; j >= 0; j--) 
        {
            if (board[i][j].IsPopped == true) 
                {
                    //move all cubes above this cube down 1
                    var cubesToMoveDown = CubesAbove(board[i][j]);
                    MoveCubesDown(cubesToMoveDown);
                };
        };
    };
}

function AllCubesInColumnArePopped(column)
{
    for (var j = board[0].length - 1; j >= 0; j--) 
        {
            if (!(board[j][column].IsPopped == true))
            {
                return false
            }
        }

        return true;
}

function CubesInColumnsLeftOf(column)
{

}

function CubesAbove(cube)
{
    var listOfCubes = [];

    //console.log("cubes above: " + cube.name);

    var x = cube.x;

    var startingY = cube.y;

    for (var i = startingY + 1; i < board[x].length; i++) 
    {
        listOfCubes.push(board[x][i]);
        //console.log(board[x][i]);
    };
    
    return listOfCubes;
}

function MoveCubesDown(cubes)
{
    for (var i = cubes.length - 1; i >= 0; i--) {
        cubes[i].y = cubes[i].y - 1;
        cubes[i].position.y = cubes[i].position.y -5;
    };
}

function MoveCubesOver(cubes)
{
    for (var i = cubes.length - 1; i >= 0; i--) {
        cubes[i].x = cubes[i].x -1;
        cubes[i].position.x =  cubes[i].position.x - 5;
    };
}