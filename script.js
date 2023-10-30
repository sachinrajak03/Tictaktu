var currentPlayer="X";
let gameGrid;
const playerInfo=document.querySelector(".player");
const boxlist=document.querySelectorAll(".box");
const resetButton=document.querySelector(".reset");

const winner=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]


initGame();
function initGame()
{
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    boxlist.forEach((box,num) => {
       
        box.innerText="";
        box.style.pointerEvents="all";
        box.classList=`box box-${num+1}`
        
    });
    resetButton.classList.remove("active");
    playerInfo.innerText=`Current Player - ${currentPlayer}`;

}

function clicked(index)
{
    if(gameGrid[index]==="")
    {
        gameGrid[index]=currentPlayer;
        boxlist[index].innerText=currentPlayer;
        boxlist[index].style.pointerEvents="none";
        if(currentPlayer==="X")
        {
            currentPlayer="O";
        }
        else{
            currentPlayer="X";
        }
        
        playerInfo.innerText=`Current Player - ${currentPlayer}`
        if(!resetButton.classList.contains("active"))
        {
            resetButton.classList.add("active");
        }
        check();
        
    }
}



boxlist.forEach((box , index) => {
    box.addEventListener("click", ()=>{
        clicked(index);
    })
    
});

// reset button
resetButton.addEventListener("click",()=>{
    initGame();
})


// the actual logic 

function check(){

   let won;
    winner.forEach(winningposition=>{


    if((gameGrid[winningposition[0]]===gameGrid[winningposition[1]])  &&    (gameGrid[winningposition[1]]===gameGrid[winningposition[2]])    &&    (gameGrid[winningposition[0]]!==""))
        {
            win=1;
            if(gameGrid[winningposition[0]] == "O") 
                    won = "O";
            else 
                    won= "X";


            // if someone won then no actions
            boxlist.forEach((box) => {
                box.style.pointerEvents = "none";
            })


            // triumph
            boxlist[winningposition[0]].classList.add("win");
            boxlist[winningposition[1]].classList.add("win");
            boxlist[winningposition[2]].classList.add("win");
 
            playerInfo.innerText=`${won} Won`;
        
        }
    });

    // no winner
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9 && won=="") {
        playerInfo.innerText = "Game Tied !";
        
    }
}