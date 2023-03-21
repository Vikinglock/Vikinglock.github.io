const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
var ticks = 0;
var mouseX = 0;
var mouseY = 0;
var shakeX = 0;
var shakeY = 0;
var clicked = false
//CANVAS SIZE
canvas.width = 640;
canvas.height = 640;
//VARIABLES
var clicks = 0;
var buttonClicked = false;
//#region functions
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }
function lengthdirX(length,direction){
    return length*Math.cos(direction);
}
function lengthdirY(length,direction){
    return length*Math.sin(direction);
}
function randomRange(min,max){
    return Math.floor(Math.random()*(max+1))+min
}
//#endregion
function gameLoop(){
    //#region drawing
    ++ticks;

    // BORDER/BACKGROUND
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    if(!buttonClicked){
        ctx.fillStyle = "red";
        ctx.fillRect(288,288,64,64);
        ctx.fillStyle = "darkred";
        ctx.fillRect(288,352,64,4);
    }
    if(buttonClicked){
        ctx.fillStyle = "darkred";
        ctx.fillRect(288,292,64,64);
        ctx.fillStyle = "black";
        ctx.fillRect(288,288,64,4);
    }
    ctx.fillStyle = "black";
    ctx.fillText("Clicks: " + clicks,20,20);
    ctx.save();
    ctx.translate(320, 160);
    ctx.rotate(Math.sin(ticks/25)/2);
    ctx.scale(Math.sin(ticks/20)/2+4,Math.sin(ticks/20)/2+4);
    ctx.textAlign = "center";
    ctx.fillText("Click the Button", 0, 0);
    ctx.restore();

    //#endregion



    canvas.addEventListener('mousemove', (event) => {

        mouseX = event.clientX-getOffset(canvas).left
        mouseY = event.clientY-getOffset(canvas).top
        //console.log(`Mouse X: ${mouseX}, Mouse Y: ${mouseY}`);
    });
    
    canvas.addEventListener('mousedown', (event) => {
        
        if(clicked){

            if(mouseX > 288 && mouseY < 352 && mouseX < 352 && mouseY > 288){
            clicks++;
            buttonClicked = true;
            }
        }
        clicked = false
        });
        canvas.addEventListener('mouseup', (event) => {
            
            clicked = true;
            buttonClicked = false;
        });
        ctx.fillStyle = "black";
        ctx.fillRect(mouseX-2,mouseY-2,4,4);
}

setInterval(gameLoop,1000/60);