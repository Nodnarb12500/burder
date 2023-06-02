// Variables
var player;
var thrownLog;

var birds = [];
var birdSquishSnd;

var backgroundImg;
var backgroundMusic;

var scoreBoard;

function startGame() {
    // debug thing for no reason
    console.log("game started!");

    //start game
    gameCanvas.start();
    thrownLog = new component(500, 80, "brown", 100, 600 - 120);
}

/*
var gameCanvas = {
    canvas : document.createElement("canvas"), // Makes Canvas

        // Set Resolution
        // TODO
        //   - Make this variable to change to the viewers screen   
        

    start : function() {
        this.canvas.id = "gameCanvas";

        this.canvas.width = 800;
        this.canvas.height = 600;

        this.context = this.canvas.getContext("2d");
        document.getElementById("gameArea").appendChild(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20); // apperently 50 fps?

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
    this.width;
    this.height;

    // Position
    this.x = x;
    this.y = y;

    // Movement
    this.speedX = 0;
    this.speedY = 0;

    // Gravity
    this.gravity = 0.05
    this.gravitySpeed = 0;

    // Bounce - proby wont use
    this.bounce = 0.6;

    this.update = function () {
        ctx = gameCanvas.context;

        if (this.type == "text") {
            // ScoreBoard
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (type == "image" || type == "background") {
            // backgrounds and Image
            if (type == background) {
                ctx.drawImage(this.image, this.x, + this.width, this.y, this.width, this.height);
            } else {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
            
        } else {
            
        }

        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }
    this.newPos = function() {
        if (this.type == "background") {
            // stop background from moving
            this.gravity = 0;
        }
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();

        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }

    this.hitBottom = function() {
        var rockBottom = gameArea.canvas.height - this.height;
        if (this.y > rockBottom) {
            this.y = rockBottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }

}
*/


var gameCanvas = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.id = "gameCanvas";
        // Canvas Size | TODO make scale with screen size
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.context = this.canvas.getContext("2d");
        document.getElementById("gameArea").appendChild(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
}


function updateGameArea() {
    gameCanvas.clear();

    //thrownLog.x += 1;

    //thrownLog.newPos();
    thrownLog.update();
}
/*
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
    if ((gameArea.frameNo/ n) % 1 == 0) {
        return true;
    }
    return false;
}
*/