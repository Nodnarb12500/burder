// Variables
var thrownLog;

var birds = [];
//var birds;
var birdSquishSnd;

var backgroundImg;
var backgroundMusic;

var scoreBoard = 0;

function startGame() {
    // debug thing for no reason
    console.log("game started!");

    // Items
    thrownLog = new component(500, 80, "brown", 100, 600 - 120);
    //birds = new component(30, 30, "black", 100, 400);
    backgroundImg = new component(800, 1200, "resources/media/background.jpg", 0, -600, "background");

    //start game
    gameCanvas.start();
}

var gameCanvas = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.id = "gameCanvas";
        // Canvas Size | TODO make scale with screen size
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.context = this.canvas.getContext("2d");
        document.getElementById("gameArea").appendChild(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 5);

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}


function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }

    // Size
    this.width = width;
    this.height = height;

    // Position
    this.x = x;
    this.y = y;

    // Speed/Movement
    this.speedX = 0;
    this.speedY = 0;

    this.update = function() {
        ctx = gameCanvas.context;

        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            if (type == "background") {
                ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);

        }

    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            console.log(backgroundImg.y == backgroundImg.height);
            if (this.y == (this.height)) {
                this.y = 0;
            }
        }
    }

    this.crashWith = function(otherobj) {
        // Player object?
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myTop = this.y;
        var myBottom = this.y + (this.height);

        // Any other item?
        var otherLeft = otherobj.x;
        var otherRight = otherobj.x + (otherobj.width);
        var otherTop = otherobj.y;
        var otherBottom = otherobj.y + (otherobj.height);

        var crash = true;

        if ((myBottom < otherTop) || (myTop > otherBottom) || (myRight < otherLeft) || (myLeft > otherRight)) {
            crash = false;

        }
        
        return crash;

    }
    
}

var playerMovment = {
    up : () => {
        thrownLog.speedY -= 1;
    },
    down : () => {
        thrownLog.speedY += 1;
    },
    left : () => {
        thrownLog.speedX -= 1;
    },
    right : () => {
        thrownLog.speedX += 1;
    },
    stop : () => {
        thrownLog.speedX = 0;
        thrownLog.speedY = 0;
    }
}

function updateGameArea() {
    var x, y;

    for (i = 0; i < birds.length; i += 1) {
        if (thrownLog.crashWith(birds[i])) {
            scoreBoard += 1;
            // dont forget to make the bird explode
        }
    }

    gameCanvas.clear();

    // background, has to be first so elements get drawns over it
    backgroundImg.speedY = 1;
    backgroundImg.newPos();
    backgroundImg.update();

    gameCanvas.frameNo += 1;
    if (gameCanvas.frameNo == 1 || everyinterval(150)) {
        x = gameCanvas.canvas.width;
        y = gameCanvas.canvas.height - 200;
        birds.push(new component(40, 80, "blue", 100, 300));
    }
    for (i = 0; i < birds.length; i += 1) {
        //birds[i].y += 1;
        birds[i].update();
    }

    document.getElementById("currentScore").innerText = "Score: " + scoreBoard;
    document.getElementById("birdsCount").innerText = "Birds: " + birds.length;
    document.getElementById("frameNum").innerText = "frames: " + gameCanvas.frameNo;

    //thrownLog.y -= 1;

    thrownLog.newPos();
    thrownLog.update();
}

function sound(src) {
    this.sound = document.createElement(audio);
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = none;
    document.body.appendChild(this.sound);
    this.play = () => {
        this.sound.play();
    },
    this.stop = () => {
        this.sound.pause();
    }
}

function everyinterval(n) {
    if ((gameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}