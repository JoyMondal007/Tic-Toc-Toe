let gamePlay=true
let currentPlayer='X'
let gameStates=["","","","","","","","",""]
const winningConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

const statusEl=document.getElementById('status')

const winningMessage=function(){
    return `${currentPlayer}'s wins`
}

const drawMessage=function(){
    return `It's a draw!!`
}

const currentPlayersTurn=function(){
    return `It's ${currentPlayer}'s turn`
}

document.querySelectorAll('.cell').forEach(function(cellElement){
    cellElement.addEventListener('click',showItem)
})

const restartBtn=document.querySelector('.restart')
restartBtn.addEventListener('click',restartGame)

function showItem(e){
    let clickedCellEl=e.target;
    let clickedCellIndexEl=parseInt(clickedCellEl.getAttribute('data-cell-index'))
    //console.log(clickedCellEl,clickedCellIndexEl)
    if(gameStates[clickedCellIndexEl] !== '' || !gamePlay){
        return;
    }
    gameStart(clickedCellEl,clickedCellIndexEl) 
    getResult() 

}

function gameStart(clickedCellEl,clickedCellIndexEl){
    gameStates[clickedCellIndexEl]=currentPlayer
    clickedCellEl.innerHTML=currentPlayer
}

statusEl.innerHTML=currentPlayersTurn()

function playerChange(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O'
    }else{
        currentPlayer = 'X'
    }
    statusEl.innerHTML=currentPlayersTurn()
}

function getResult(){
    let roundWon=false
    for(let i=0; i<=7; i++){
        const winCondition=winningConditions[i]
        let a=gameStates[winCondition[0]]
        let b=gameStates[winCondition[1]]
        let c=gameStates[winCondition[2]]
        
        if(a ==='' || b ==='' || c ===''){
            continue;
        }
        if(a===b && b===c){
            roundWon=true
            break;
        }
        //console.log(winCondition[i])
    }
    if(roundWon){
        statusEl.innerHTML=winningMessage()
        gamePlay=false
        return;
    }

    let roundDraw = !gameStates.includes("")
    if(roundDraw){
        statusEl.innerHTML = drawMessage()
        gamePlay=false
        return;
    }
    playerChange()
}

function restartGame(){
    /*
    let currentPlayer = 'X'
    let gameStates=["","","","","","","","",""]
    let gamePlay=true
    statusEl.innerHTML=currentPlayersTurn()
   
    document.querySelectorAll('.cell').forEach(function(cellElement){
        cellElement.innerHTML=``;
    })
    */
   window.location.reload()

}