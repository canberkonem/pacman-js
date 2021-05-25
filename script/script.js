const grid = document.querySelector(".grid")
let currentIndex = 490
let direction = 1
const width = 28
const startEvent = document.querySelector("#start")
const restartEvent = document.querySelector("#restart")
let score =  0
let highest = (JSON.parse(localStorage.getItem("score"))) ? JSON.parse(localStorage.getItem("score")) : 0
const scoreDisplay = document.querySelector("#score")
const highestScoreDisplay = document.querySelector("#highest")

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,1,1,4,4,4,4,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,4,4,4,4,4,4,4,4,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,4,4,1,4,4,1,4,4,1,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,4,1,1,2,2,1,1,4,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,1,4,1,1,2,2,1,1,4,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,4,1,1,2,2,1,1,4,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,4,1,1,1,1,1,1,4,1,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerdots
// 4 - empty

let boxes = []

function createGrid(){
    for(let i=0; i<layout.length; i++){
        const box = document.createElement("div")
        grid.appendChild(box)
        boxes.push(box)
        if(layout[i]== 0){boxes[i].classList.add("pacdots")}
        if(layout[i]== 2){boxes[i].classList.add("lair")}
        if(layout[i]== 1){boxes[i].classList.add("wall")}
        if(layout[i]== 3){boxes[i].classList.add("powerdots")}
    }
    boxes[currentIndex].classList.add("pacman")
}
createGrid()

highestScoreDisplay.innerHTML = `Highest score: ${highest}`





function pacmanMove(){
    if(!boxes[currentIndex+direction].classList.contains("wall"))  
    {
    boxes[currentIndex].classList.remove("pacman")
    if(currentIndex == 390 && direction == 1){
        currentIndex = 364
    }else if(currentIndex == 365 && direction == -1){
        currentIndex = 391
    }else{
        currentIndex += direction
    }
    boxes[currentIndex].classList.add("pacman")
    earnScore()
    }
}



window.addEventListener("keydown", function(event){
    if(event.key == "ArrowDown" &&
    !boxes[currentIndex+28].classList.contains("wall") && 
    !boxes[currentIndex+28].classList.contains("ghost"))
    {
     direction = width
    }
    if(event.key == "ArrowLeft" &&
    !boxes[currentIndex-1].classList.contains("wall") && 
    !boxes[currentIndex-1].classList.contains("ghost"))
    {
     direction = -1
    }
    if(event.key == "ArrowRight" &&
    !boxes[currentIndex+1].classList.contains("wall") && 
    !boxes[currentIndex+1].classList.contains("ghost"))
    {
     direction = 1
    }
    if(event.key == "ArrowUp" &&
    !boxes[currentIndex-width].classList.contains("wall") && 
    !boxes[currentIndex-width].classList.contains("ghost"))
    {
     direction = -width
    }
    event.preventDefault()
})

class ghost {
    constructor(name, startIndex, speed){
        this.name = name;
        this.startIndex = startIndex;
        this.positionIndex = startIndex;
        this.speed = speed;
        this.isScared = false;
        this.timer = NaN
        this.ghostDirection = -width
    }
}

ghosts = [
    new ghost("ghost1", 377, 160),
    new ghost("ghost2", 378, 160),
    new ghost("ghost3", 433, 180),
    new ghost("ghost4", 434, 180),
    new ghost("ghost5", 405, 190),
    new ghost("ghost6", 406, 190)
]

function earnScore(){
    if(boxes[currentIndex].classList.contains("pacdots")){
        boxes[currentIndex].classList.remove("pacdots")
        score ++
    }
    if(boxes[currentIndex].classList.contains("powerdots")){
        boxes[currentIndex].classList.remove("powerdots")
        score +=10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unscareGhosts, 10000)
    }
    scoreDisplay.innerHTML = `Score: ${score}`
}

function unscareGhosts(){
    ghosts.forEach(ghost => ghost.isScared = false)
}

ghosts.forEach(ghost => {
    boxes[ghost.startIndex].classList.add(ghost.name)
    boxes[ghost.startIndex].classList.add("ghost")
});


const ghostDirections = [1,-1,width,-width]

function ghostMove(ghost){
    ghost.timer = setInterval(function(){
        if(!boxes[ghost.positionIndex+ghost.ghostDirection].classList.contains("wall")&&
        !boxes[ghost.positionIndex+ghost.ghostDirection].classList.contains("ghost"))
        {
        boxes[ghost.positionIndex].classList.remove(ghost.name)
        boxes[ghost.positionIndex].classList.remove("ghost","scared")
        ghost.positionIndex += ghost.ghostDirection
        boxes[ghost.positionIndex].classList.add(ghost.name)
        boxes[ghost.positionIndex].classList.add("ghost")
        }else{
            ghost.ghostDirection = ghostDirections[Math.floor(Math.random()*ghostDirections.length)]
        }

        if(ghost.isScared){
            boxes[ghost.positionIndex].classList.add("scared")
        }

        if(ghost.isScared && boxes[ghost.positionIndex].classList.contains("pacman")){
            boxes[ghost.positionIndex].classList.remove(ghost.name,"ghost","scared")
            ghost.positionIndex = ghost.startIndex
            boxes[ghost.startIndex].classList.add("ghost")
        }
    },ghost.speed)
}

let init 
function startGame(){
    init = setInterval(pacmanMove,240)
    ghosts.forEach(ghost => ghostMove(ghost))
    let gameEnd = setInterval(checkGameEnd,5)
}

function checkGameEnd(){
if((boxes[currentIndex].classList.contains("ghost") &&
!boxes[currentIndex].classList.contains("scared")) || score == 273
){
    ghosts.forEach(ghost => clearInterval(ghost.timer))
    clearInterval(init)
    restartEvent.style.display = "block"
    if(score>highest){
        localStorage.setItem("score",score)
        highestScoreDisplay.innerHTML = `Highest score: ${score}`
    }
    
}
}

startEvent.addEventListener("click", startGame)
startEvent.addEventListener("click", function(){
    startEvent.style.display = "none"
})

function restartGame(){
    location.reload()
    startGame()
}

restartEvent.addEventListener("click", restartGame)