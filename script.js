

// create playing grid, preview grid and score/ level
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
            posX: 0,
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
    startingState = {
        level: state.level,
        tetrimono: {
            blocks: state.tetrimono.blocks,
            posX: 3,
            posY: 0
        }
    };

    let combined = getCombined(startingState);
    displayBlock(combined);

}

function getCombined(updatedState) {
    
    let combined = [];
    //console.log(startingState.tetrimono.blocks)
    let posX = updatedState.tetrimono.posX;
    let posY = updatedState.tetrimono.posY;
    let block = updatedState.tetrimono.blocks;
    let blockIndex = 0;

    console.log(startingState.tetrimono.posX, startingState.tetrimono.posY);

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

    //console.log(combined);
    return combined;

}

function displayBlock(blockView) {
   
    let merged = [].concat.apply([], blockView)
    //console.log(merged);
    for(let i = 0; i <= merged.length; i++){
        if(merged[i] == 1){
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
    let arrowPress = event.which || event.keyCode;
    let block = startingState.tetrimono.blocks;
    combined = getCombined(startingState);
    let leftEdge = false;
    let rightEdge= false;
    let bottomEdge = false;

    console.log(startingState.tetrimono.posX, startingState.tetrimono.posY)
    switch(arrowPress){
        // LEFT ARROW KEY
        case 37: 
            startingState = {
                level: startingState.level,
                tetrimono: {
                    blocks: startingState.tetrimono.blocks,
                    posX: startingState.tetrimono.posX -= 1,
                    posY: startingState.tetrimono.posY
                }
            };
              
            console.log(combined)
            for(let i = 0; i < combined.length; i++){
                if(combined[i][0] == 1) leftEdge = true;
            }

            if(leftEdge == true) startingState.tetrimono.posX++;

            displayBlock(getCombined(startingState));
            
        break;

        // RIGHT ARROW KEY

        case 39:
            startingState = {
                level: startingState.level,
                tetrimono: {
                    blocks: startingState.tetrimono.blocks,
                    posX: startingState.tetrimono.posX += 1,
                    posY: startingState.tetrimono.posY
                }
            };  

            console.log(combined)
            for(let i = 0; i < combined.length; i++){
                if(combined[i][9] == 1) rightEdge = true;
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

            console.log(combined)
            for(let i = 0; i < combined.length; i++){
                if(combined[19][i] == 1) bottomEdge = true;
            }

            if(bottomEdge == true) startingState.tetrimono.posY--;
            
            displayBlock(getCombined(startingState));
           
        break;
        
        case 38:
            startingState = spinBlock();
        
            for(let i = 0; i < combined.length; i++){

                if(combined[i][0] == 1) leftEdge = true;
                if(combined[i][9] == 1) rightEdge = true;
                if(combined[19][i] == 1) bottomEdge = true;

            }

            if(leftEdge == true) startingState.tetrimono.posX++;

            if(rightEdge == true) startingState.tetrimono.posX--;
            
            if(bottomEdge == true) startingState.tetrimono.posY--;

            displayBlock(getCombined(startingState));
        break;

        

    }

    function spinBlock(){

        let currentBlocks = startingState.tetrimono.blocks.slice();
        let spinnedBlock = [];

        // empty block template
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
  
}




// render starting UI
renderDOMElements();

// all white boxes selected
const gridBoxes = document.getElementById('tetris').childNodes[1].childNodes

//TIMEOUT STARTING POSITION
setTimeout(() => {

    startTetris();
    window.onkeydown = moveBlock;

}, 500);



// MOVE ON KEYPRESS




/// INCASE I NEED TO COMBINE STATES

//     function combineState(shape) {
//         let updatedState = {
//             gridState: [
//             ...shape.gridState,
//             ...state.gridState.slice(1, state.gridState.length + 1)
//             ] 
//         }
//         console.log(state)
//         console.log(updatedState)


//         setGridState(updatedState);
//     }

// function setGridState(updatedState) {
    

//     console.log(state)
//     state = {
//         ...state,
//         ...updatedState  
        
//     }

//     console.log(state.gridState);
// }


    


//start displaying shapes after 1 second

// start clock

// at each level there is a certain interval which tells you how fast the

// save blocks in a container somewhere and call the blocks to randomly appear

// random block apears

// next block appears in the displaygrid

// block starts going down


// CHANGE COLOR OF BRICKS
//     // gridState[4].style.backgroundColor = '#ff3333';
//     // gridState[5].style.backgroundColor = '#ff3333';

//     // gridState[14].style.backgroundColor = '#ff3333';
//     // gridState[15].style.backgroundColor = '#ff3333';

//     // for(let i = 0; i <= gridState.length; i++){

//     // }


// }

/*
    //how to select to change color
    let selectBox = fluit.childNodes[5]

    selectBox.style.backgroundColor = '#e60000'
*/
