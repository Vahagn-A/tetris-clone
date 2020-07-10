const gridMapping = {
    playingGrid: 200,
    previewGrid: 25
}

function renderDOMElements() {

    const container = document.getElementById('tetris');

    const playingGridNode = document.createElement('div');
    playingGridNode.setAttribute('class', 'playing-grid');

    const displayNode = document.createElement('div');
    displayNode.setAttribute('class', 'display');

    const previewGridNode = document.createElement('div');
    previewGridNode.setAttribute('class', 'preview-grid');

    const playingGrid = container.appendChild(playingGridNode);

    const display = container.appendChild(displayNode);
    const previewGrid = display.appendChild(previewGridNode);

    createGridElements(gridMapping.playingGrid, playingGrid);
    createGridElements(gridMapping.previewGrid, previewGrid);

    function createGridElements(size, grid) {

        for(let i = 0; i < size; i++){
            let boxNode = document.createElement('div');
            boxNode.setAttribute('class', 'white box')

            grid.appendChild(boxNode);

        }
    }

    const scoreNode = document.createElement('div');
    scoreNode.setAttribute('class', 'score');
    let scoreTextNode = document.createTextNode('score:')
    scoreNode.appendChild(scoreTextNode);
    
    const levelNode = document.createElement('div');
    levelNode.setAttribute('class', 'level');
    let levelTextNode = document.createTextNode('level:')
    levelNode.appendChild(levelTextNode);
    

    display.appendChild(scoreNode);
    display.appendChild(levelNode);

}

const allShapes = {
    lineShape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    squareShape: [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
    zShape: [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
    sShape: [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
    lShape: [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
    reverseLShape: [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
    tShape: [[0, 0, 0], [1, 1, 1], [0, 1, 0]]
}

let randomShape;

function generateStartingState() {

    let state = {
        level: [],
        tetrimono: {
            blocks: createStartingShape(),
            posX: 3,
            posY: -1
        }
    };

    for(let i = 0; i < 20; i++){
        state.level.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    return state;

}

state = generateStartingState();

let startingState = {}

function startTetris() {
    let lostGame = false
    startingState = generateStartingState();

    let combined = getCombined(startingState);

    for(let x = 0; x <= combined[x].length; x++){
        if(state.level[0][x] == 1 && combined[0][x] == 1) lostGame = true;
    }

    if(lostGame == true){
        clearInterval(blockDownInterval);
        alert('get rekd noob')
    }else{
        displayBlock(combined);
    }

}

let combined;

function getCombined(updatedState) {
    
    combined = [];

    let posX = updatedState.tetrimono.posX;
    let posY = updatedState.tetrimono.posY;
    let block = updatedState.tetrimono.blocks;
    let blockIndex = 0;

    for (let el of updatedState.level) {
        
        combined.push([...el]);
        
        if(combined.length > posY && block.length > blockIndex ){
            
            for(let i = 0; i < block[0].length; i++) {
                if(block[blockIndex][i] == 1) combined[posY].splice(posX, 1, block[blockIndex][i]);
                posX++
            }
            blockIndex++
            posX = updatedState.tetrimono.posX;
            posY++
        }
    }    
    return combined;

}



function displayBlock(blockView) {

    let mergedDynamic = [].concat.apply([], blockView);
    let mergedStatic = [].concat.apply([], state.level)
    let boxColor = displayBoxColor(randomShape);

    excistingBoxIndex = mergedStatic.findIndex(el => el == 1);

    for(let x = 0; x <= gridBoxes.length; x++){
        if(mergedStatic[x] == 1){
            gridBoxes[x].style.backgroundColor
        }else{
            if(mergedDynamic[x] == 1 || mergedStatic[x] == 1) {
                        gridBoxes[x].style.backgroundColor = boxColor;      
                }
        }
    }
}


function displayBoxColor(shape) {
    let newColor;

    switch(shape) {
        case 'lineShape':
            newColor = '#0341AE'
            break;
        case 'squareShape':
            newColor = '#FFD500';
            break;
        case 'zShape':
            newColor = '#00FF00';
            break;
        case 'sShape':
            newColor = '#72CB3B';
            break;
        case 'lShape':
            newColor = '#CC00FF';
            break;
        case 'reverseLShape':
            newColor = '#FF3213';
            break;
        case 'tShape':
            newColor = '#FF971C';
            break;
    }
    return newColor;
}



function createStartingShape() {

    const startingShapes = [allShapes.lineShape, allShapes.squareShape, allShapes.zShape, allShapes.sShape, allShapes.lShape, allShapes.reverseLShape, allShapes.tShape];

    const shapeOrder = ['lineShape', 'squareShape', 'zShape', 'sShape', 'lShape', 'reverseLShape', 'tShape']

    let randomNumber = Math.floor(Math.random() * startingShapes.length)
    let selectedShape = startingShapes[randomNumber];
    randomShape = shapeOrder[randomNumber];

    return selectedShape;

}

let tetrisContainer = document.getElementById('tetris');

// clear playingfield
function clearPlayingField() {
    let excistingBoxIndex;
    let mergedStatic = [].concat.apply([], state.level)
    
    excistingBoxIndex = mergedStatic.findIndex(el => el == 1);
    
    if(excistingBoxIndex < 0) excistingBoxIndex = 200;

    for(let x = 0; x < gridBoxes.length; x++){
        if(mergedStatic[x] != 1){
            gridBoxes[x].style.backgroundColor = '#747272';
        }else{
            gridBoxes[x].style.backgroundColor;
        }
    }
   
}   


function moveBlock(event) {
    //console.log(startingState.tetrimono.blocks)
    clearPlayingField();

    movingBlock = getCombined(startingState);
    let finalRow = state.level.length - 1;
    let arrowPress = event.which || event.keyCode;

    let posX = startingState.tetrimono.posX;
    let posY = startingState.tetrimono.posY;
    let blocks = startingState.tetrimono.blocks;

    let leftEdge = false; let rightEdge = false; let bottomEdge = false; let touchDown = false; let fullLine = false;

    switch(arrowPress){
       
        case 37: 
            startingState = {
                level: startingState.level,
                tetrimono: {
                    blocks: blocks,
                    posX: posX -= 1,
                    posY: posY
                }
            };


            for(let y = 0; y <= finalRow ; y++){
                if(movingBlock[y][0] == 1) leftEdge = true;

                for(let x = 0; x <= state.level[y].length; x++){
                    if(movingBlock[y][x] == 1 && state.level[y][x - 1] == 1) leftEdge = true;
                }
            }

            if(leftEdge == true) startingState.tetrimono.posX++;
            displayBlock(getCombined(startingState));
            
        break;
        
        case 39:
            startingState = {
                level: startingState.level,
                tetrimono: {
                    blocks: blocks,
                    posX: posX += 1,
                    posY: posY
                }
            };  


            for(let y = 0; y <= finalRow ; y++){
                if(movingBlock[y][9] == 1) rightEdge = true;

                for(let x = 0; x <= state.level[y].length; x++){
                    if(movingBlock[y][x] == 1 && state.level[y][x + 1] == 1) rightEdge = true;
    
                }
            }

            if(rightEdge == true) startingState.tetrimono.posX--;
            displayBlock(getCombined(startingState));
            
        break;

        case 40:
            startingState = {
                level: startingState.level,
                tetrimono: {
                    blocks: blocks,
                    posX: posX,
                    posY: posY +=1
                }
            };

            for(let x = 0; x <= finalRow ; x++){
                if(movingBlock[finalRow][x] == 1) bottomEdge = true;
            }

            if(bottomEdge == true) {
                startingState.tetrimono.posY++;
                createStaticBlocks(posX, posY)
            }

            if(touchDown == false) displayBlock(getCombined(startingState));
           
        break;
        
        case 38:
            startingState.tetrimono.posY < 0 ? startingState.tetrimono.posY = 0 : startingState.tetrimono.posY; 
            startingState = spinBlock();
            displayBlock(getCombined(startingState));

        break;
        
        default: displayBlock(movingBlock);

    }
// ik was hier laatst
    staticBlockDetection(touchDown, posX, posY);
    checkFullLine();

}



function checkFullLine(){
    for(let y = 0; y < state.level.length; y++){
        if (!state.level[y].some(el => el == 0)) {
            deleteLine(y);
        }
    }
}

function deleteLine(index){
    state.level.splice(index, 1);
    state.level.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    displayBlock(state.level)
}



function checkBorder(blocks){
    
    let finalRow = state.level.length - 1;
    
    let posX = startingState.tetrimono.posX;
    let posY = startingState.tetrimono.posY;
    
    startingState = {
        level: startingState.level,
        tetrimono: {
            blocks: startingState.tetrimono.blocks,
            posX: startingState.tetrimono.posX,
            posY: startingState.tetrimono.posY
        }
    }
    
    let checkBlocks = getCombined(startingState);
    
    for(let y = 0; y <= finalRow ; y++){
        
        if(posX < 0 || posX > 7 || posY < 0) return false;
        if(posX > 6 && startingState.tetrimono.blocks.length == 4) return false;
        if(checkBlocks[finalRow][y] == 1) return false;
        
        for(let x = 0; x <= state.level[y].length - 1 ; x++){
            if(checkBlocks[y][x] == 1 && state.level[y][x] == 1)return false;  
        }
    }
    return true;
}

function spinBlock(){
    let currentBlocks = startingState.tetrimono.blocks.slice();
    let spinnedBlock = [];
    
    
    for(let i = 0; i < currentBlocks.length; i++){
        currentBlocks[0].length == 4 ? spinnedBlock.push([0, 0, 0, 0]) : spinnedBlock.push([0, 0, 0])
    }
    
    for (let y = 0; y < currentBlocks.length; y++) {        
        for (let x = 0; x < currentBlocks[0].length; x++) {
            spinnedBlock[x][currentBlocks.length - 1 - y] = currentBlocks[y][x];
        }
    }
    
    let borderCrossed = checkBorder(spinnedBlock);
    
    if(borderCrossed == true){
        startingState.tetrimono.blocks = spinnedBlock;
        
        
        
    }else if(borderCrossed == false){
        startingState.tetrimono.blocks = currentBlocks;
        
    } 
    return startingState;
    
};


function staticBlockDetection(touchDown, posX, posY) {

    for(let y = 0; y < state.level.length ; y++){
        for(let x = 0; x < state.level[y].length ; x++) {
           if(y > 0){
               if(combined[y][x] == 1 && state.level[y][x] == 1) {
                   touchDown = true;
               }
           }
        }
    }
    if(touchDown === true) {
        createStaticBlocks(posX, posY)
    }

}

function createStaticBlocks(posX, posY) {
    clearPlayingField();
    
    startingState = {
        level: startingState.level,
        tetrimono: {
            blocks: startingState.tetrimono.blocks,
            posX: posX,
            posY: posY -=1
        }
    }
    
    displayBlock(getCombined(startingState));
    
    
    for (let y = 0; y < state.level.length ; y++) {
        for(let x = 0; x <= combined[y].length; x++) {
            if(combined[y][x] === 1) state.level[y][x] = 1;      
        }           
    }
    displayBlock(state.level);
    startTetris();
}



// render starting UI
renderDOMElements();
startTetrisTimeout();

// all white boxes selected
const gridBoxes = document.getElementById('tetris').childNodes[1].childNodes

//TIMEOUT STARTING POSITION
function startTetrisTimeout() {
    setTimeout(() => {
        startTetris();
        window.onkeydown = moveBlock;
    }, 500);

}

const blockDownInterval = setInterval(() => {
    let simulatedEvent = new KeyboardEvent("keypress", {keyCode: 40, which: 40});
    moveBlock(simulatedEvent);

}, 1200);
