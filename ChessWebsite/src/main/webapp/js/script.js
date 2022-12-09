//now time to add 2 player.
//need to apply check/ check mate change with move validations
//set intersection operations possible. to do this.
//create websocket to allow moves for black pieces.



var el = {};
// current square : square id, piece_id : piece id,
el.positions = {}; // focus on positions first
//player moves only calculates the current players valid moves.
//for white pawns need to switch up to - y, instead of + y
el.playerSide = "B"; // player has white pieces. //todo function to decide this.
el.playerMoves = {};
el.piecePos = {};


iniPos();
chess();
console.log(el.positions)

// create array that contains all black and white moves

iniMoves();
newTurn();
console.log(el.playerMoves);
console.log(el.positions);


//functions to allow dragging and dropping of chess pieces to the chess board.
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
 }

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  var move_target = ""
  //prevent case where we hit img instead of chess square by giving parent node of chess img.
  if (ev.target.classList.contains("chess-square")) {
    move_target = ev.target
  }
  else {
    move_target = ev.target.parentNode;
  }

  //get x y of the current square
   var x = parseInt(ev.target.id.charAt(0));
   var y = parseInt(ev.target.id.charAt(1));

  //if piece_id can perform this move then drop
  if (isValidMove(move_target, data)) {
    move_target.appendChild(document.getElementById(data));
    //remove piece from square
    deletePos(data);
    //add piece to new square
    movePiece(data,move_target.id)
    iniMoves(); // reset playerMoves.
    newTurn(); 
    }

}

//initatiate  positions.
function iniPos() {
    el.positions["square_id"] = {};
    for (var i = 8; i >= 1; i-- ){
        for (var j = 8; j >=1; j--) {
            el.positions["square_id"][j + "" + i] = {};
            el.positions["square_id"][j + "" + i]["x"] =  j;
            el.positions["square_id"][j + "" + i]["y"] = i;
            el.positions["square_id"][j + "" + i]["piece_id"] = "";

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
            el.playerMoves[el.playerSide + "K" + i] = new Set(); //knight
            el.playerMoves[el.playerSide + "B" + i] = new Set(); // bishop
        }

        // king and queen
        el.playerMoves[el.playerSide + "KI" ] = new Set();
        el.playerMoves[el.playerSide + "Q1"] = new Set();

    }


    //


//deletes at previous position
function deletePos(pos) {
    console.log("del");
    for (var i = 0; i < 64; i++) {
        var currPos = (Math.floor(i/8) + 1) + "" + ((i%8)+1)
        if ( el.positions["square_id"][currPos].piece_id == pos  ) el.positions["square_id"][currPos].piece_id = "";
    }
}

//adds new position of piece
//need to work here for taking pieces too!!!!!!!!!!!!!!
function movePiece(piece_id, pos) {

   //empty poisitoon
    if ( el.positions["square_id"][pos].piece_id == ""  ) {
            el.positions["square_id"][pos].piece_id = piece_id;
        }
    //else if enemy piece
    else {
        //replace image at position
        var square = document.getElementById(pos);
        square.removeChild(square.children[0]);
        //add draggable back
        //change position to current piece_id
        el.positions["square_id"][pos].piece_id = piece_id

        //need to get chess square

    }

}



//check if key-value pair exists in array and return that
function isValidMove(data ,piece_id) {
    var x = parseInt(data.id.charAt(0));
    var y = parseInt(data.id.charAt(1));

    //find piece id

    for (const coord of el.playerMoves[piece_id]) {

        if (x == coord.charAt(0) && y == coord.charAt(1)) return true
    }

}

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
        for (var j = 1; j <= 8; j++) {
            var chessSquare = document.createElement("div");
            chessSquare.className = "chess-square";
            chessSquare.id = (j + "" + (i));
            const piece = document.createElement("img");
            piece.draggable = true;
            piece.addEventListener("dragstart",drag);

            if((i + j) % 2 == 0 ) {
                chessSquare.style.backgroundColor = '#00F';
            }

            //white pawn
            if (i == 2){

                piece.src = "../Icons/white-pawn.png";
                piece.className = "chess-piece pawn";
                piece.id = "WP"+ j;
                chessSquare.appendChild(piece);

            }

            //black pawn
             if (i == 7){
                piece.src = "../Icons/black-pawn.png";
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
                    piece.src = "../Icons/black-rook.png";}
                }
                //white rooks
                if (i == 1)  {
                    piece.id = "WR"+ (Math.floor(j /8) +1);
                    piece.src = "../Icons/white-rook.png";
                    }


                if (piece.src != "" )chessSquare.appendChild(piece);


              //knights
              if ( j ==  2 || j == 7) {
                piece.className = "chess-piece knight";

                //black knight
                if (i == 8) {
                    piece.id = "BK"+ (Math.floor(j /7) +1);
                    piece.src = "../Icons/black-knight.png";
                }

                //white knight
                if (i == 1) {
                    piece.id = "WK" +  (Math.floor(j /7) +1);
                    piece.src = "../Icons/white-knight.png";
                }

                if (piece.src != "" )chessSquare.appendChild(piece);
              }

              //bishop
              if ( j ==  3 || j == 6) {
                 piece.className = "chess-piece bishop";
                //black bishop
                if (i == 8) {
                    piece.id = "BB"+ (Math.floor(j /6) +1);
                    piece.src = "../Icons/black-bishop.png";
                }

                //white bishop
                if (i == 1) {
                    piece.id = "WB"+ (Math.floor(j /6) +1);
                    piece.src = "../Icons/white-bishop.png";
                }

                if (piece.src != "" )chessSquare.appendChild(piece);
              }

              //queens
              if (j == 4) {
                piece.className = "chess-piece queen";

                //black queen
                if (i ==  8 ) {
                    piece.id = "BQ"+ 1;
                    piece.src = "../Icons/black-queen.png";
                }

                if (i == 1) {
                    piece.id = "WQ"+ 1;
                    piece.src = "../Icons/white-queen.png";
                }

                if (piece.src != "" )chessSquare.appendChild(piece);
              }

              //kings
              if(j==5) {
                piece.className = "chess-piece king";

                if (i ==  8 ) {
                    piece.id = "BKI";
                    piece.src = "../Icons/black-king.png";
                }

                if (i == 1) {
                    piece.id = "WKI";
                    piece.src = "../Icons/white-king.png";
                }

                if (piece.src != "" )chessSquare.appendChild(piece);
              }

        chessSquare.addEventListener("drop", drop);
        chessSquare.addEventListener("dragover", allowDrop);
        //
        el.positions["square_id"][chessSquare.id]["piece_id"] = piece.id;
        //instead of x-y, just chess square id?
        el.positions["square_id"][chessSquare.id]["x"] = j;
        el.positions["square_id"][chessSquare.id]["y"] = i;
        el.positions["square_id"][chessSquare.id]["piece_id"] = piece.id;
       // .push({piece_id : piece.id , square_id : chessSquare.id });
        chessBoard.appendChild(chessSquare);
        }
    }

}


//go through all pieces and call the moveset functions
function newTurn() {
    //loop through all  positions
    for (const element of Object.keys(el.positions["square_id"])) {
        if (el.positions["square_id"][element]["piece_id"] == null) continue;
        //get first letter of id and only perform function on matching W or B depending on side
        if (el.positions["square_id"][element]["piece_id"].charAt(0) == el.playerSide) {


            var x = parseInt(el.positions["square_id"][element]["x"]);
            var y = parseInt(el.positions["square_id"][element]["y"]);
            var piece_id = el.positions["square_id"][element]["piece_id"];

            var piece_info = el.positions["square_id"][element]["piece_id"].replace(/[0-9]/g, '').slice(1);
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
                    king(x,y, el.positions["square_id"][element]["piece_id"]);
                    break;
            }
        }

    }
}


//!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!MOVES!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!

//pawn moveset
function pawn (x,y, piece_id) {
    if (el.playerSide == "W") {
        if(y <= 8 ) {
            //todo promotion
            if (y == 8) { return;}

            if (y == 2) { el.playerMoves[piece_id].add(x + "" + (y + 2));}

            if (el.positions["square_id"][(x ) + ""+  (y + 1)]["piece_id"] == "")
            {el.playerMoves[piece_id].add(x + "" + (y+1));}
            if ( x+1 <= 8 && el.positions["square_id"][(x + 1 ) + ""+  (y + 1)]["piece_id"].charAt(0) == "B" ) {
				el.playerMoves[piece_id].add((x + 1) + "" + (y+1));
                }
            if ( x - 1 >= 1 &&el.positions["square_id"][(x -1  ) + ""+  (y + 1)]["piece_id"].charAt(0) == "B" ) {
				el.playerMoves[piece_id].add((x - 1) + "" + (y+1));
				}
            }
        }
    
    if (el.playerSide == "B") {
		if( y >= 1 ) {
        	//todo promotion
        	if (y == 1) {return;}

        	if (y == 7 ) { el.playerMoves[piece_id].add(x + "" + (y-2));}

        	if (el.positions["square_id"][(x) + ""+  (y - 1)]["piece_id"] == "")
            	{el.playerMoves[piece_id].add(x + "" + (y-1));}
			
           	if ( x+1 <= 8 && el.positions["square_id"][(x + 1 ) + ""+  (y - 1)]["piece_id"].charAt(0) == "W" ) {
            	el.playerMoves[piece_id].add((x + 1) + "" + (y-1));
            	}
            if ( x - 1 >= 1 &&el.positions["square_id"][(x -1  ) + ""+  (y - 1)]["piece_id"].charAt(0) == "W" ) {
            	el.playerMoves[piece_id].add((x - 1) + "" + (y-1));
                }
           	}
    	}
}


//bishop function moveset validation
function bishop(x,y, piece_id) {

    var offset = 1;
    var copy = offset;

    //topleft -> bottom right remainders
    while (offset + y <= 8 && offset + x <=8 ) {
        if (el.positions["square_id"][(x + offset) + ""+  (y + offset)]["piece_id"] != "") {
            if (el.positions["square_id"][(x + offset) + ""+  (y + offset)]["piece_id"].charAt(0) == el.playerSide) break;
            else {
                 el.playerMoves[piece_id].add((x + offset) + "" + (y+offset));
                 break;
            }
        }
        el.playerMoves[piece_id].add((x + offset) + "" + (y+offset));
        offset++;

    }

    //reset offset to  copy
    offset = copy;

    while (y - offset >= 1 && x - offset >= 1 ) {
        if (el.positions["square_id"][(x - offset) + ""+  (y - offset)]["piece_id"] != "") {
            if ( el.positions["square_id"][(x - offset) + ""+  (y - offset)]["piece_id"].charAt(0) == el.playerSide) break;
            else {
                el.playerMoves[piece_id].add((x - offset) + "" + (y - offset));
                break;
            }
        }
        el.playerMoves[piece_id].add((x - offset) + "" + (y - offset));
        offset++;
        }


    //reset offset to  copy
    offset = copy;

    //bottom left -> top right remainders
    while (offset + y <= 8 && x  - offset >=1 ) {

        if (el.positions["square_id"][(x - offset) + ""+  (y + offset)]["piece_id"] != "") {
            if (el.positions["square_id"][(x - offset) + ""+  (y + offset)]["piece_id"].charAt(0) == el.playerSide ) break;
            else {
                 el.playerMoves[piece_id].add((x - offset) + "" + (y + offset));
                 break;
                 }
            }
            el.playerMoves[piece_id].add((x - offset) + "" + (y + offset));
            offset++;
        }
        //reset offset to  copy
        offset = copy;
    while (y - offset >= 1 && x + offset <= 8 ) {
        if (el.positions["square_id"][(x + offset) + ""+  (y - offset)]["piece_id"] != "") {
            if (el.positions["square_id"][(x + offset) + ""+  (y - offset)]["piece_id"].charAt(0) == el.playerSide) break;
            else {
                el.playerMoves[piece_id].add((x + offset) + "" + (y - offset));
                break;
                }
            }

            el.playerMoves[piece_id].add((x + offset) + "" + (y - offset));
            offset++;
            }

}

//rook function moveset validation
function rook(x,y, piece_id) {

    //left
    for (var left = x- 1; left >= 1; left--) {
        if (el.positions["square_id"][left + ""+ y]["piece_id"] != "")  {
            if (el.positions["square_id"][left + ""+ y]["piece_id"].charAt(0) == el.playerSide) break;

            el.playerMoves[piece_id].add( left + "" + y);
            break;
        }
        el.playerMoves[piece_id].add( left + "" + y);
    }

    //right
    for (var right = x + 1; right <= 8; right++) {
            if(el.positions["square_id"][right + ""+ y]["piece_id"] != "")  {
                if (el.positions["square_id"][right + ""+ y]["piece_id"].charAt(0) == el.playerSide) break;
                el.playerMoves[piece_id].add( right + "" + y);
                break;
            }
            el.playerMoves[piece_id].add( right + "" + y);
        }

    //up
    for (var up = y +1; up <= 8; up++) {
        if (el.positions["square_id"][x + "" + up]["piece_id"] != "") {
            if (el.positions["square_id"][x + ""+ up]["piece_id"].charAt(0) == el.playerSide) break;
            el.playerMoves[piece_id].add( x + "" + up);
            break;
        }
        el.playerMoves[piece_id].add( x + "" + up);
    }
    //down
    for (var down = y -1; down >= 1; down--) {
        if (el.positions["square_id"][x + "" + down]["piece_id"] != "") {
            if (el.positions["square_id"][x + ""+ down]["piece_id"].charAt(0) == el.playerSide) break;
            el.playerMoves[piece_id].add( x + "" + down);
            break;
        }
        el.playerMoves[piece_id].add( x + "" + down);
    }
}

function knight (x,y, piece_id) {
		
        if (y -2 >= 1) {
            //left
            if (x - 1 >= 1  ) {
                if (el.positions["square_id"][ (x-1) + "" + (y -2)]["piece_id"] == "")
                    {el.playerMoves[piece_id].add((x - 1 ) + "" + (y - 2));}
                if (el.positions["square_id"][ (x-1) + "" + (y -2)]["piece_id"].charAt(0) != el.playerSide)
                    {el.playerMoves[piece_id].add((x - 1 ) + "" + (y - 2));}
            }


            //right
            if ( x + 1 <= 8) {
                if (el.positions["square_id"][ (x+1) + "" + (y -2)]["piece_id"] == "")
                    {el.playerMoves[piece_id].add((x + 1 ) + "" + (y - 2));}
                if (el.positions["square_id"][ (x+1) + "" + (y -2)]["piece_id"].charAt(0) != el.playerSide)
                     {el.playerMoves[piece_id].add((x + 1 ) + "" + (y - 2));}

            }
     }

        //up
        if (y +2 <= 8 ) {
            //left
            if (x - 1 >= 1) {
                if (el.positions["square_id"][ (x-1) + "" + (y +2)]["piece_id"] == "")
                    { el.playerMoves[piece_id].add((x - 1 ) + "" + (y + 2)); }
                if (el.positions["square_id"][ (x-1) + "" + (y +2)]["piece_id"].charAt(0) != el.playerSide)
                   {el.playerMoves[piece_id].add((x - 1 ) + "" + (y + 2));}
            }


            //right
            if (x + 1 <= 8) {
                if (el.positions["square_id"][ (x+1) + "" + (y +2)]["piece_id"] == "")
                    { el.playerMoves[piece_id].add((x + 1 ) + "" + (y + 2)); }
                if (el.positions["square_id"][ (x+1) + "" + (y +2)]["piece_id"].charAt(0) != el.playerSide)
                   {el.playerMoves[piece_id].add((x + 1 ) + "" + (y + 2));}
            }
        }

        //left
        if (x -2 >= 1) {
            //up
            if (y - 1 >= 1) {
                if (el.positions["square_id"][ (x - 2) + "" + (y -1)]["piece_id"] == "")
                    { el.playerMoves[piece_id].add((x - 2) + "" + (y -1)); }
                if (el.positions["square_id"][ (x - 2) + "" + (y -1)]["piece_id"].charAt(0) != el.playerSide)
                   {el.playerMoves[piece_id].add((x - 2) + "" + (y -1));}
                }

            //down
            if (y + 1 <= 8) {
                if (el.positions["square_id"][ (x - 2) + "" + (y + 1)]["piece_id"] == "")
                    { el.playerMoves[piece_id].add((x - 2) + "" + (y  + 1)); }
                if (el.positions["square_id"][ (x - 2) + "" + (y + 1)]["piece_id"].charAt(0) != el.playerSide)
                   {el.playerMoves[piece_id].add((x - 2) + "" + (y + 1));}
                }

        }

        //right
        if (x+2 <= 8) {
            //up
            if (y  - 1 >= 1) {
                if (el.positions["square_id"][ (x + 2) + "" + (y - 1)]["piece_id"] == "")
                    { el.playerMoves[piece_id].add((x + 2) + "" + (y  - 1)); }
                if (el.positions["square_id"][ (x + 2) + "" + (y - 1)]["piece_id"].charAt(0) != el.playerSide)
                   {el.playerMoves[piece_id].add((x + 2) + "" + (y - 1));}
                }
            //down
            if (y + 1 <= 8) {
                if (el.positions["square_id"][ (x + 2) + "" + (y + 1)]["piece_id"] == "")
                    { el.playerMoves[piece_id].add((x + 2) + "" + (y  + 1)); }
                if (el.positions["square_id"][ (x + 2) + "" + (y + 1)]["piece_id"].charAt(0) != el.playerSide)
                   {el.playerMoves[piece_id].add((x + 2) + "" + (y + 1));}
                }
            }
}


function queen (x,y, piece_id) {
    rook(x,y, piece_id);
    bishop(x, y, piece_id);
}

function king (x,y , piece_id) {

    //multi-directional move
    //right
    if (x + 1 <= 8) {
        if ( y + 1 <= 8) {
            if (el.positions["square_id"][(x + 1) + ""+ ( y + 1)]["piece_id"] == "")
                el.playerMoves[piece_id].add((x  + 1 ) + "" + (y + 1));
            if (el.positions["square_id"][(x + 1) + ""+ ( y + 1)]["piece_id"].charAt(0) != el.playerSide)
                el.playerMoves[piece_id].add((x  + 1 ) + "" + (y + 1));
        }
        if (el.positions["square_id"][(x + 1) + ""+ ( y )]["piece_id"] == "") {
            el.playerMoves[piece_id].add((x  + 1 ) + "" + (y ));
        } else if ( el.positions["square_id"][(x + 1) + ""+ ( y )]["piece_id"].charAt(0) != el.playerSide) {
             el.playerMoves[piece_id].add((x  + 1 ) + "" + (y ));
        }

        if ( y - 1 >= 1) {
            if (el.positions["square_id"][(x + 1) + ""+ ( y  - 1)]["piece_id"] == "")
                el.playerMoves[piece_id].add((x  + 1 ) + "" + (y - 1));
            if (el.positions["square_id"][(x + 1) + ""+ ( y  - 1)]["piece_id"].charAt(0) != el.playerSide)
                el.playerMoves[piece_id].add((x  + 1 ) + "" + (y - 1));
        }
    }

    // only up and down
    if ( y + 1 <= 8) {
        if(el.positions["square_id"][(x ) + ""+ ( y  + 1)]["piece_id"] == "") {
            el.playerMoves[piece_id].add((x  ) + "" + (y + 1));
        }
        if(el.positions["square_id"][(x ) + ""+ ( y  + 1)]["piece_id"].charAt(0) != el.playerSide) {
            el.playerMoves[piece_id].add((x  ) + "" + (y + 1));
        }
    }

    if ( y - 1 >= 1) {
            if(el.positions["square_id"][(x ) + ""+ ( y  - 1)]["piece_id"] == "") {
                el.playerMoves[piece_id].add((x  ) + "" + (y - 1));
            }
            if(el.positions["square_id"][(x ) + ""+ ( y  - 1)]["piece_id"].charAt(0) != el.playerSide) {
                el.playerMoves[piece_id].add((x  ) + "" + (y - 1));
            }
        }


    if (x - 1 >= 1) {
        if ( y + 1 <= 8) {
            if (el.positions["square_id"][(x - 1) + ""+ ( y + 1)]["piece_id"] == "")
                el.playerMoves[piece_id].add((x  - 1 ) + "" + (y + 1));
            if (el.positions["square_id"][(x - 1) + ""+ ( y + 1)]["piece_id"].charAt(0) != el.playerSide)
                el.playerMoves[piece_id].add((x  - 1 ) + "" + (y + 1));
        }

        if (el.positions["square_id"][(x - 1) + ""+ ( y )]["piece_id"] == "") {
            el.playerMoves[piece_id].add((x  - 1 ) + "" + (y ));
        } else if ( el.positions["square_id"][(x - 1) + ""+ ( y )]["piece_id"].charAt(0) != el.playerSide) {
             el.playerMoves[piece_id].add((x  - 1 ) + "" + (y ));
        }

        if (y - 1 >= 1 && el.positions["square_id"][(x - 1) + ""+ ( y  - 1)]["piece_id"] == "") {
            el.playerMoves[piece_id].add((x -1 ) + "" + (y - 1));
        }
        if ( y - 1 >= 1) {
            if (el.positions["square_id"][(x - 1) + ""+ ( y - 1)]["piece_id"] == "")
                el.playerMoves[piece_id].add((x  - 1 ) + "" + (y - 1));
            if (el.positions["square_id"][(x - 1) + ""+ ( y - 1)]["piece_id"].charAt(0) != el.playerSide)
                el.playerMoves[piece_id].add((x  - 1 ) + "" + (y - 1));
        }
    }
    //todo unavailable moves that would put king into check
}
