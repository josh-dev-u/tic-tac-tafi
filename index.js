let canvasList = document.querySelectorAll('.tile-canvas');
let currentCanvas = '';
let currentPlayer = true; // true for player one, false for player two
let blockedTiles = [];
let gameNotification = document.getElementById('game-notification');
let gameNotificationText = document.getElementById('game-notification-text');
let restartButton = document.getElementById('restart-button');
let lines = document.getElementById('vertical-horizontal-lines');
let rightDiagonalLine = document.getElementById('right-diagonal-line');
let leftDiagonalLine = document.getElementById('left-diagonal-line');

// list of tiles
let tileList = {
    topL: '',
    topM: '',
    topR: '',
    midL: '',
    midM: '',
    midR: '',
    bottomL: '',
    bottomM: '',
    bottomR: '',
}

// canvas click event function
let canvasClick = (e) => {
    currentCanvas = e.target

    // checking for tiles that have already been clicked.
    if(!blockedTiles.length){
        canvasDraw()
        return;
    } else {
        blockedTiles.forEach((item, i) => {
            if(currentCanvas.id === item.id){
                console.log('tile already in use.')
                return;
            } else if (i + 1 === blockedTiles.length){
                canvasDraw();
            }
        })
    }
}

let canvasDraw = () => {
    if(currentPlayer){
        console.log('X')
        drawX()
    } else if(!currentPlayer) {
        console.log('O')
        drawO();
    }

    // keeps track of which player picked what square    
    switch(currentCanvas.id){
        case 'top-left-canvas':
            tileList.topL = currentPlayer;
            break;
        case 'top-mid-canvas':
            tileList.topM = currentPlayer;
            break;
        case 'top-right-canvas':
            tileList.topR = currentPlayer;
            break;
        case 'mid-left-canvas':
            tileList.midL = currentPlayer;
            break;
        case 'mid-mid-canvas':
            tileList.midM = currentPlayer;
            break;
        case 'mid-right-canvas':
            tileList.midR = currentPlayer;
            break;
        case 'bottom-left-canvas':
            tileList.bottomL = currentPlayer;
            break;
        case 'bottom-mid-canvas':
            tileList.bottomM = currentPlayer;
            break;
        case 'bottom-right-canvas':
            tileList.bottomR = currentPlayer;
            break;
    }

    // updates which tiles are used and which is the current player
    blockedTiles.push(currentCanvas)
    currentPlayer = !currentPlayer;
    checkForWin();
}

// draws both sides of the X
let drawX = () => {
    let ctx = currentCanvas.getContext('2d'); 
    let leftLineToX = 10;
    let leftLineToY = 10;

    let rightLineToX = 145;
    let rightLineToY = 5;

    let drawLeftInterval = setInterval(()=> {
        ctx.fillStyle = '#000000';
        ctx.moveTo(0, 0);
        ctx.lineTo(leftLineToX, leftLineToY);
        ctx.stroke();
        leftLineToX += 10;
        leftLineToY += 10;

        if(leftLineToX > 150){
            clearInterval(drawLeftInterval)

            let drawRightInterval = setInterval(()=> {
                ctx.fillStyle = '#000000';
                ctx.moveTo(150, 0);
                ctx.lineTo(rightLineToX, rightLineToY);
                ctx.stroke();
                rightLineToX -= 10;
                rightLineToY += 10;
                if(rightLineToX < 0){
                    clearInterval(drawRightInterval)
                }
            }, 1000 / 60)
        }
    }, 1000 / 60)
}

// draws the circle
let drawO = () => {
    let ctx = currentCanvas.getContext('2d'); 
    let num = 6;

    let circleInterval = setInterval(()=>{
        ctx.beginPath()
        ctx.arc(75, 75, 75, num, 2 * Math.PI);
        ctx.stroke()
        num--;
        if(num < 0){
            clearInterval(circleInterval);
        }
    }, 1000 / 60)
}

// adds the click event listener to all canvases in the node list
let addEventListenerList = (list, event, fn) => {
    for (let i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}
addEventListenerList(canvasList, 'click', canvasClick);


let showResults = (text, line) => {
    // show winner and restart button
    gameNotification.style.display = 'flex';
    gameNotification.style.opacity = .9;
    gameNotification.style.marginTop = 0;
    gameNotificationText.innerHTML = text;

    // mark a line for the winner
    switch(line){
        case 'hTop':
            lines.style.display = 'flex';
            lines.style.borderTop = '2px solid gold';
            lines.style.width = '550px';
            lines.style.height = '400px';
            break;
        case 'hMid':
            lines.style.display = 'flex';
            lines.style.borderTop = '2px solid gold';
            lines.style.width = '550px';
            break;
        case 'hBottom':
            lines.style.display = 'flex';
            lines.style.borderBottom = '2px solid gold';
            lines.style.width = '550px';
            lines.style.height = '400px';
            break;
        case 'vLeft':
            lines.style.display = 'flex';
            lines.style.height = '550px';
            lines.style.width = '400px';
            lines.style.borderLeft = '2px solid gold';
            break;
        case 'vMid':
            lines.style.display = 'flex';
            lines.style.height = '550px';
            lines.style.borderLeft = '2px solid gold';
            break;
        case 'vRight':
            lines.style.display = 'flex';
            lines.style.height = '550px';
            lines.style.width = '400px';
            lines.style.borderRight = '2px solid gold';
            break;
        case 'dTopRight':
            rightDiagonalLine.style.display = 'flex';
            break;
        case 'dTopLeft':
            leftDiagonalLine.style.display = 'flex';
            break;

    }
}

let checkForWin = () => {

    // horizontal wins
    if(tileList.topL === tileList.topM && tileList.topL === tileList.topR){
        if(tileList.topL === true)
            showResults('X is the winner!!', 'hTop')
        if(tileList.topL === false)
            showResults('O is the winner!!', 'hTop')    
        
    }

    if(tileList.midL === tileList.midM && tileList.midL === tileList.midR){
        if(tileList.midL === true)
            showResults('X is the winner!!', 'hMid')
        if(tileList.midL === false)
            showResults('O is the winner!!', 'hMid')
        
    }

    if(tileList.bottomL === tileList.bottomM && tileList.bottomL === tileList.bottomR){
        if(tileList.bottomL === true)
            showResults('X is the winner!!', 'hBottom')
        if(tileList.bottomL === false)
            showResults('O is the winner!!', 'hBottom')
        
    }

    // vertical wins
    if(tileList.topL === tileList.midL && tileList.topL === tileList.bottomL){
        if(tileList.topL === true)
            showResults('X is the winner!!', 'vLeft')
        if(tileList.topL === false)
            showResults('O is the winner!!', 'vLeft')  
        
    }

    if(tileList.topM === tileList.midM && tileList.topM === tileList.bottomM){
        if(tileList.topM === true)
            showResults('X is the winner!!', 'vMid')
        if(tileList.topM === false)
            showResults('O is the winner!!', 'vMid') 
        
    }

    if(tileList.topR === tileList.midR && tileList.topR === tileList.bottomR){
        if(tileList.topR === true)
            showResults('X is the winner!!', 'vRight')
        if(tileList.topR === false)
            showResults('O is the winner!!', 'vRight')
            
        
    }

    // diagonal wins
    if(tileList.topR === tileList.midM && tileList.topR === tileList.bottomL){
        if(tileList.topR === true)
            showResults('X is the winner!!', 'dTopRight')
        if(tileList.topR === false)
            showResults('O is the winner!!', 'dTopRight')
        
    }

    if(tileList.topL === tileList.midM && tileList.topL === tileList.bottomR){
        if(tileList.topL === true)
            showResults('X is the winner!!', 'dTopLeft')
        if(tileList.topL === false)
            showResults('O is the winner!!', 'dTopLeft')  
        
    }

    // waits for a tie
    if(blockedTiles.length >= 8) {
        showResults('Its a tie!')    
        
    }
}

// restarts the game 
let restartGame = () => {
    location.reload();
}
restartButton.addEventListener('click', restartGame);


  