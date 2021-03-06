/*
* Author:  Igor Vinicius Freitas de Souza
* GitHub: https://github.com/igor1043
* E-mail: igorviniciusfreitasouza@gmail.com
*/

var id;
var inGame = true;
var userSimbol = "0";
var iaSimbol = "X";
var board = { 
    0: ["","",""],
    1: ["","",""], 
    2: ["","",""] 
};
var gameScore = {
    ia:0,
    draw:0
};

$(function(){
    $(".game-section").click(function() {
        if ($(this).children(0).html() == "-" && inGame) {
            $(this).html("<h1>"+userSimbol+"</h1>");
            id = $(this).attr("id").split("-");
            board[id[0]][id[1]] = userSimbol;
            setTimeout(function() {
                merge(board,next(iaSimbol,board));
            }, 100);
        } else
            alert("Ação inválida!");
    });
});

function merge(a,b) {
    
    //sem próxima jogada, o jogo termina em empate!
    if (b == null) {

        alert("Empate!");
        inGame = false;
        $("#draw-score").html(++gameScore.draw);

    } else {

        let count = 0;

        for (let x = 0; x  < 3; x++) {
            for (let y = 0; y  < 3; y++) {
            
                if (b[x][y] != "")
                    count++;

                if (a[x][y] == "" && b[x][y] != "") {
                    $("#row-"+x+" div")[y].children[0].innerHTML = iaSimbol;
                    board[x][y] = iaSimbol;
                    break;
                }
            }   
        }

        //verifica se a IA ganhou com está jogada!
        setTimeout(function() {
        
            if (winner(board) == iaSimbol) {
    
                alert("Você perdeu");
                inGame = false;
                $("#ia-score").html(++gameScore.ia);
    
            } 
        }, 100);
    }
}


function reset() {

    for (let i = 0; i < 3; i++) {
        list =  $("#row-"+i+" div");
        for (let j = 0; j < list.length; j++) 
            list[j].children[0].innerHTML = "-";
        
     }

     board = { 
        0: ["","",""],
        1: ["","",""], 
        2: ["","",""] 
    };

    last = null;
    inGame = true;
}
