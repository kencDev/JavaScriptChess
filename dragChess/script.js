
var el = {};
// current square : square id, piece_id : piece id,
el.positions = {}; // focus on positions first
//player moves only calculates the current players valid moves.
//for white pawns need to switch up to - y, instead of + y
el.playerSide = "W"; // player has white pieces. //todo function to decide this.
el.playerMoves = {};


iniPos();
chess();

//console.log(el.positions);
// create array that contains all black and white moves
console.log(el.positions);
iniMoves();
newTurn();
console.log(el.playerMoves);


//functions to allow dragging and dropping of chess pieces to the chess board.
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
 }

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//  START HERE START HERE START HERE START HERE START HERE START HERE
//  START HERE START HERE START HERE START HERE START HERE START HERE
//  START HERE START HERE START HERE START HERE START HERE START HERE
//  START HERE START HERE START HERE START HERE START HERE START HERE
//  START HERE START HERE START HERE START HERE START HERE START HERE
//  START HERE START HERE START HERE START HERE START HERE START HERE
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  //get x y of the current square
   var x = parseInt(ev.target.id.charAt(0));
   var y = parseInt(ev.target.id.charAt(1));
  //if piece_id can perform this move then drop

  if (isValidMove(x,y, data)) {
    ev.target.appendChild(document.getElementById(data));
    //remove piece from square
    deletePos(data);
    //add piece to new square
    movePiece(data,ev.target.id)
    iniMoves(); // reset playerMoves.
    newTurn();
    }

}

//initatiate  positions.
function iniPos() {
    el.positions["square_id"] = {};
    for (var i = 8; i >= 1; i-- ){
        for (var j = 8; j >=1; j--) {
            el.positions["square_id"][i + "" + j] = {};
            el.positions["square_id"][i + "" + j]["x"] =  i;
            el.positions["square_id"][i + "" + j]["y"] = j;
            el.positions["square_id"][i + "" + j]["piece_id"] = "";

        }
    }

}




//initatiate player moves function.
function iniMoves() {
        //pawns
        for (var i = 1; i <= 8; i++) {
            el.playerMoves[el.playerSide + "P" + i] = new Set(); //create array;
        }

        //rooks, knights, bishops
        for (var i = 1 ; i <= 2; i++) {
            el.playerMoves[el.playerSide + "R" + i] = new Set(); //rook
            console.log(typeof el.playerMoves[el.playerSide + "R" + i] )
            el.playerMoves[el.playerSide + "K" + i] = new Set(); //knight
            el.playerMoves[el.playerSide + "B" + i] = new Set(); // bishop
        }

        // king and queen
        el.playerMoves[el.playerSide + "KI" ] = new Set();
        el.playerMoves[el.playerSide + "Q1"] = new Set();

    }


    //


//deletes at certain position
function deletePos(pos) {
    for (var i = 0; i < 64; i++) {
        if ( el.positions[i].piece_id == pos  ) el.positions[i].piece_id = "";
    }
}

//adds new position of piece
function movePiece(piece_id, pos) {
    for (var i = 0; i < 64; i++) {
            if ( el.positions[i].square_id == pos  ) {
                el.positions[i].piece_id = piece_id;}
        }
}



//check if key-value pair exists in array and return that
function isValidMove(x,y,piece_id) {
    for (const element of el.playerMoves) {
        if (element.piece == piece_id) {
            if (element.x == x && element.y == y)  {return true;}

            }
    }
}

//console.log(isValidMove( 0, 4,"WP1"));
// call to create chess board, only call once.
function chess() {
/*
     var chessboard = document.getElementById('chessboard');

     var chessSquare = document.createElement("div");
     chessSquare.className = "chess-square";

     chessboard.appendChild(chessSquare);
*/
    var chessBoard = document.getElementById('chessboard');

    for (var i = 8 ; i >= 1; i--) {
        for (var j = 8; j >= 1; j--) {
            var chessSquare = document.createElement("div");
            chessSquare.className = "chess-square";
            chessSquare.id = (i + "" + (j));
            const piece = document.createElement("img");
            piece.draggable = true;
            piece.addEventListener("dragstart",drag);

            if((i + j) % 2 == 0 ) {
                chessSquare.style.backgroundColor = '#00F';
            }

            //white pawn
            if (i == 2){

                piece.src = "res/white-pawn.png";
                piece.className = "chess-piece pawn";
                piece.id = "WP"+ j;
                chessSquare.appendChild(piece);

            }

            //black pawn
             if (i == 7){
                piece.src = "res/black-pawn.png";
                piece.className = "chess-piece pawn";
                piece.id = "BP" + j;

                chessSquare.appendChild(piece);
              }

              //rooks
              if ( j ==  1 || j == 8) {

                piece.className = "chess-piece rook";

                //black rooks
                if (i == 8) {
                    piece.id = "BR" + (Math.floor(j /8) +1); // currently generic piece ids, but will need to differentiate between white/black soon
                    piece.src = "res/black-rook.png";}
                }
                //white rooks
                if (i == 1)  {
                    piece.id = "WR"+ (Math.floor(j /8) +1);
                    piece.src = "res/white-rook.png";
                    }


                if (piece.src != "" )chessSquare.appendChild(piece);


              //knights
              if ( j ==  2 || j == 7) {
                piece.className = "chess-piece knight";

                //black knight
                if (i == 8) {
                    piece.id = "BK"+ (Math.floor(j /7) +1);
                    piece.src = "res/black-knight.png";
                }

                //white knight
                if (i == 1) {
                    piece.id = "WK" +  (Math.floor(j /7) +1);
                    piece.src = "res/white-knight.png";
                }

                if (piece.src != "" )chessSquare.appendChild(piece);
              }

              //bishop
              if ( j ==  3 || j == 6) {
                 piece.className = "chess-piece bishop";
                //black bishop
                if (i == 8) {
                    piece.id = "BB"+ (Math.floor(j /6) +1);
                    piece.src = "res/black-bishop.png";
                }

                //white bishop
                if (i == 1) {
                    piece.id = "WB"+ (Math.floor(j /6) +1);
                    piece.src = "res/white-bishop.png";
                }

                if (piece.src != "" )chessSquare.appendChild(piece);
              }

              //queens
              if (j == 4) {
                piece.className = "chess-piece queen";

                //black queen
                if (i ==  8 ) {
                    piece.id = "BQ"+ 1;
                    piece.src = "res/black-queen.png";
                }

                if (i == 1) {
                    piece.id = "WQ"+ 1;
                    piece.src = "res/white-queen.png";
                }

                if (piece.src != "" )chessSquare.appendChild(piece);
              }

              //kings
              if(j==5) {
                piece.className = "chess-piece king";

                if (i ==  8 ) {
                    piece.id = "BKI";
                    piece.src = "res/black-king.png";
                }

                if (i == 1) {
                    piece.id = "WKI";
                    piece.src = "res/white-king.png";
                }

                if (piece.src != "" )chessSquare.appendChild(piece);
              }

        chessSquare.addEventListener("drop", drop);
        chessSquare.addEventListener("dragover", allowDrop);
        //
        el.positions["square_id"][chessSquare.id]["piece_id"] = piece.id;
        //instead of x-y, just chess square id?
        el.positions["square_id"][chessSquare.id]["x"] = i;
        el.positions["square_id"][chessSquare.id]["y"] = j;
        el.positions["square_id"][chessSquare.id]["piece_id"] = piece.id;
        //console.log(el.positions["square_id"][chessSquare.id]["piece_id"]);
       // .push({piece_id : piece.id , square_id : chessSquare.id });
        chessBoard.appendChild(chessSquare);
        }
    }

}

//need function to calculate valid moves of all pieces.


//rook moves
/*
const myElement = document.getElementById('chessboard');
for (const child of myElement.children) {
    let childrenNodeArr = Array.from(child.children);
    //console.log(typeof childrenNodeArr[0]);
    if (childrenNodeArr[0] != undefined) {console.log(childrenNodeArr[0].className);}

}
*/

//validation code cba exporting to eclipse rn
//but import js should work in the eclipse server given our assumption that the issue is that
//we are calling files to url and not actual localhost:// etc.


//need to create an array of each position in the chess board
//call this script whenever move is made by other player.
//need to take in the piece id and put that data into the el.playerMoves piece mapping.

//go through all pieces and call the moveset functions
function newTurn() {
    //loop through all  positions
    for (const element of Object.keys(el.positions["square_id"])) {
        console.log(el.positions["square_id"][element]["piece_id"]);
        if (el.positions["square_id"][element]["piece_id"] == null) continue;
        //get first letter of id and only perform function on matching W or B depending on side
        //get remaining letters and store in a var
        if (el.positions["square_id"][element]["piece_id"].charAt(0) == el.playerSide) {


            var x = parseInt(el.positions["square_id"][element]["x"]);
            var y = parseInt(el.positions["square_id"][element]["y"]);
            var piece_id = el.positions["square_id"][element]["piece_id"];

            var piece_info = el.positions["square_id"][element]["piece_id"].replace(/[0-9]/g, '').slice(1);
            console.log(piece_info);
            //switch statement for all pieces
            switch(piece_info) {
                case "P" :
                    pawn(x,y ,piece_id);
                    break;
                case "R":
                    rook(x,y, piece_id);
                    break;
                case "K":
                    knight(x,y,el.positions["square_id"][element]["piece_id"]);
                    break;
                case "B":
                    bishop(x,y, el.positions["square_id"][element]["piece_id"]);
                    break;
                case "Q":
                    queen(x,y, el.positions["square_id"][element]["piece_id"]);
                    break;
                case "KI":
                    console.log(piece_id);
                    king(x,y, el.positions["square_id"][element]["piece_id"]);
                    break;
            }
        }

    }
}




//pawn moveset
function pawn (x,y, piece_id) {
chessSquare.id = (i + "" + (j));
    if (el.playerSide == "W") {
        if (y == 6) { el.playerMoves[piece_id].add(x + "" + (y-2));}
        el.playerMoves[piece_id].add(x + "" + (y-1));
    }
    if (el.playerSide == "B") {
        if (y == 1) { el.playerMoves[piece_id].add(x + "" + (y+2));}
        el.playerMoves[piece_id].add(x + "" + (y-1));
    }
}


//bishop function moveset validation
function bishop(x,y, piece_id) {

    //topleft -> bottom right diagonal
    var offset = 1;
    while ((offset + y <= 8 && y - offset >=  1) &&  (offset + x <= 8 && x - offset >= 1) ) {
        //topleft -> bottom right diagonal
                el.playerMoves[piece_id].add((x - offset) + "" + (y + offset));
                el.playerMoves[piece_id].add((x + offset) + "" + (y+offset));

        //bottom left -> top right diagonal
            el.playerMoves[piece_id].add((x - offset) + "" + (y - offset));
            el.playerMoves[piece_id].add((x + offset) + "" + (y - offset));

        offset++;
    }

    //create copy of offset
    var copy = offset;
    //topleft -> bottom right remainders
    while (offset + y <= 8 && offset + x <=8 ) {
        el.playerMoves[piece_id].add((x + offset) + "" + (y+offset));
        offset++;
    }
    while (y - offset >= 1 && x - offset >= 1 ) {
        el.playerMoves[piece_id].add((x - offset) + "" + (y - offset));
        offset++;
        }


    //reset offset to  copy
    offset = copy;

    //bottom left -> top right remainders
        while (offset + y <= 7 && x  - offset >=0 ) {
            el.playerMoves[piece_id].add((x - offset) + "" + (y + offset));
            offset++;
        }

        while (y - offset >= 0 && x + offset <= 7 ) {
            el.playerMoves[piece_id].add((x + offset) + "" + (y - offset));
            offset++;
            }

}

//rook function moveset validation
function rook(x,y, piece_id) {

    //up down
    for (var vertical = 1 ; vertical <= 8; vertical++) {
        if (vertical == y) continue;
        el.playerMoves[piece_id].add((x ) + "" + (vertical));

    }

    //left right
    for (var horizontal = 1; horizontal <= 8; horizontal++) {
        el.playerMoves[piece_id].add((horizontal) + "" + (y));
    }

}

//two spaces up/down -> 1 space left/right
//two spaces left/right -> 1 space up/down
function knight (x,y, piece_id) {

        // up
        if (y -2 >= 1) {
            //left
            if (x - 1 >= 1) { el.playerMoves[piece_id].add((x - 1 ) + "" + (y - 2));}
            //right
            if ( x + 1 <= 8 ) {el.playerMoves[piece_id].add((x + 1 ) + "" + (y - 2));}
        }

        //down
        if (y +2 <= 8 ) {
            //left
            if (x - 1 >= 1) { el.playerMoves[piece_id].add((x + 1 ) + "" + (y + 2));}
            //right
            if ( x + 1 <= 8 ) { el.playerMoves[piece_id].add((x + 1 ) + "" + (y + 2));}
        }

        //left
        if (x -2 >= 1) {
            //up
            if (y -1 >= 1) {el.playerMoves[piece_id].add((x -2 ) + "" + (y - 1));}
            //down
            if (y + 1 <= 8) {el.playerMoves[piece_id].add((x -2 ) + "" + (y - + 1 ));}
        }

        //right
        if (x+2 <= 8) {
            //up
            if (y -1 >= 1) {el.playerMoves[piece_id].add((x + 2 ) + "" + (y - 1));}
            //down
            if (y + 1 <= 8) {el.playerMoves[piece_id].add((x  + 2 ) + "" + (y + 1));}
        }


}

//queen just calls bishop and knight
function queen (x,y, piece_id) {
    rook(x,y, piece_id);
    bishop(x, y, piece_id);
}

function king (x,y , piece_id) {

    //multi-directional move
    el.playerMoves[piece_id].add((x  + 1 ) + "" + (y + 1));
    el.playerMoves[piece_id].add((x  + 1 ) + "" + (y ));
    el.playerMoves[piece_id].add((x  + 1 ) + "" + (y - 1));
    el.playerMoves[piece_id].add((x   ) + "" + (y + 1));
    el.playerMoves[piece_id].add((x   ) + "" + (y - 1));
    el.playerMoves[piece_id].add((x -1 ) + "" + (y + 1));
    el.playerMoves[piece_id].add((x -1 ) + "" + (y ));
    el.playerMoves[piece_id].add((x -1 ) + "" + (y - 1));

    //todo unavailable moves that would put king into check
}





