

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


// PLAYING - GRID


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


function displayBlock(blockView) {
   
    let merged = [].concat.apply([], blockView)
    
    for(let i = 0; i <= merged.length; i++){
        if(merged[i] == 1){
            gridBoxes[i].style.backgroundColor = '#ff3333';
        }
    }
    
}

function getCombined() {
    
    let combined = [];
    let posX = state.tetrimono.posX;
    let posY = state.tetrimono.posY;
    let block = state.tetrimono.blocks;
    

    for (let el of state.level) {
        
        combined.push([...el]);

        if(block.length > posY){

            for(let i = 0; i < block[0].length; i++) {
                combined[posY].splice(posX , 1, block[posY][i])
                posX++
            }
             posX -= posX
             posY++

        }


    }


    displayBlock(combined);

    
}


function createStartingShape() {
    const lineShape = [[1, 1, 1, 1]];
    const squareShape = [[1, 1, 0], [1, 1, 0]];
    const zShape = [[1, 1, 0], [0, 1, 1], [0, 0, 0]];
    const sShape = [[0, 1, 1], [1, 1, 0]];
    const lShape = [[1, 1, 1], [1, 0, 0]];
    const reverseLShape = [[1, 0, 0], [1, 1, 1]];
    const tShape = [[0, 1, 0], [1, 1, 1]];

    const allShapes = [lineShape, squareShape, zShape, sShape, lShape, reverseLShape, tShape];

    let randomShape = Math.floor(Math.random() * allShapes.length);
    
    return allShapes[randomShape];
   

}


    

// render starting UI
renderDOMElements();


// all white boxes
let gridBoxes = document.getElementById('tetris').childNodes[1].childNodes


// starting state is made 
let state = generateStartingState();




// TIMEOUT STARTING POSITION
// setTimeout(() => {
   
//     startingPosition();

// }, 1000);



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
