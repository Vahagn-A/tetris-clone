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

// PLAYING - GRID
// starting state is made 


function generateStartingState() {

    let state = {
        level: [],
        tetrimono: {
            blocks: createStartingShape(),
            posX: 3,
            posY: 0
        }
    };

    for(let i = 0; i < 20; i++){

        state.level.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    
    }

    return state;

}

state = generateStartingState();



let startingState = {}

function startTetris() {
    startingState = generateStartingState();

    let combined = getCombined(startingState);
    displayBlock(combined);

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

                if(block[blockIndex][i] == 1) combined[posY].splice(posX, 1, block[blockIndex][i])
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
 
    for(let i = 0; i <= gridBoxes.length; i++){
        if(mergedDynamic[i] == 1 || mergedStatic[i] == 1){
            gridBoxes[i].style.backgroundColor = '#ff3333';
        }
    }   
}


function createStartingShape() {

    const startingShapes = [allShapes.lineShape, allShapes.squareShape, allShapes.zShape, allShapes.sShape, allShapes.lShape, allShapes.reverseLShape, allShapes.tShape];

    let randomShape = Math.floor(Math.random() * startingShapes.length);
    
    return startingShapes[randomShape];


}

let tetrisContainer = document.getElementById('tetris');

// clear playingfield
function clearPlayingField() {

    for(let i = 0; i < gridBoxes.length; i++){
        gridBoxes[i].style.backgroundColor = '#747272';
    }

}   





function moveBlock(event) {

    clearPlayingField();
    combined = getCombined(startingState);

    let finalRow = state.level.length - 1;
    let arrowPress = event.which || event.keyCode;

    let leftEdge = false; let rightEdge = false; let bottomEdge = false; 
    let touchDown = false;

    switch(arrowPress){
       
        case 37: 
            startingState = {
                level: startingState.level,
                tetrimono: {
                    blocks: startingState.tetrimono.blocks,
                    posX: startingState.tetrimono.posX -= 1,
                    posY: startingState.tetrimono.posY
                }
            };
            
            leftPress = true, rightPress = false, bottomPress = false;

            for(let y = 0; y <= finalRow ; y++){
                if(combined[y][0] == 1) leftEdge = true;

                for(let x = 0; x <= state.level[y].length ; x++){
                if(combined[y][x] == 1 && state.level[y][x - 1] == 1) leftEdge = true;

                }
            }

            if(leftEdge == true) startingState.tetrimono.posX++;
            displayBlock(getCombined(startingState));
            
        break;
        
        case 39:
            startingState = {
                level: startingState.level,
                tetrimono: {
                    blocks: startingState.tetrimono.blocks,
                    posX: startingState.tetrimono.posX += 1,
                    posY: startingState.tetrimono.posY
                }
            };  

            leftPress = false, rightPress = true, bottomPress = false;

            for(let y = 0; y <= finalRow ; y++){
                if(combined[y][9] == 1) rightEdge = true;

                for(let x = 0; x <= state.level[y].length ; x++){
                    if(combined[y][x] == 1 && state.level[y][x + 1] == 1) rightEdge = true;
    
                }
            }

            if(rightEdge == true) startingState.tetrimono.posX--;
            displayBlock(getCombined(startingState));
            
        break;

        case 40:
            startingState = {
                level: startingState.level,
                tetrimono: {
                    blocks: startingState.tetrimono.blocks,
                    posX: startingState.tetrimono.posX,
                    posY: startingState.tetrimono.posY +=1
                }
            };           

            leftPress = false, rightPress = false, bottomPress = true;

            for(let x = 0; x <= finalRow ; x++){
                if(combined[finalRow][x] == 1) bottomEdge = true;
            }

            if(bottomEdge == true) startingState.tetrimono.posY--;
            displayBlock(getCombined(startingState));
           
        break;
        
        case 38:
            // spin blocked if: 
            // block on Y - 1 ; 
            // block next to static block( onspin check if clash ) 
            // long bar cannot spin on the border

            startingState = spinBlock();
            displayBlock(getCombined(startingState));

        break;
        
        default: displayBlock(combined);

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

        startingState = {
            level: startingState.level,
            tetrimono: {
                blocks: spinnedBlock,
                posX: startingState.tetrimono.posX,
                posY: startingState.tetrimono.posY
            }
        }   
        return startingState;
    
    };

    for(let y = 0; y <= finalRow ; y++){
        if(combined[finalRow][y] == 1) touchDown = true; 
        for(let x = 0; x < state.level[y].length ; x++){
 
            if(bottomPress == true){
                if(y >= 1){
                    if(combined[y - 1][x] == 1 && state.level[y][x] == 1){
                        touchDown = true;
                    }
                }
            }    
        }
     }
 
     if(touchDown == true){
        staticBlocks();
     }
}

function staticBlocks(){

    for (let y = 0; y < state.level.length; y++) {
            for(let x = 0; x < combined[y].length; x++) {
                if(combined[y][x] == 1) {
                    state.level[y][x] = 1 ;
                }
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
function startTetrisTimeout(){
    setTimeout(() => {
    
        startTetris();
        window.onkeydown = moveBlock;
    
    }, 500);

}
