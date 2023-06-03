// Variables
var thrownLog;

var birds = [];
//var birds;
var birdSquishSnd;

var backgroundImg;
var backgroundMusic;

var scoreBoard = 0;

var gameSpeed = 1;

function startGame() {
    // debug thing for no reason
    console.log("game started!");

    // Items
    thrownLog = new component(710, 80, "brown", 40, 600 - 120);
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
        this.interval = setInterval(updateGameArea, 20);

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
                ctx.drawImage(this.image, this.x, this.y + -this.height, this.width, this.height);
     
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
            if ((this.y) >= (gameCanvas.canvas.height)) {
                this.y = -this.height / 2;
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
            if (birds[i].died) {
                // this if statement might be useless at some point. not decided yet

            } else {
                scoreBoard += 1;
                birds[i].died = true;

                // dont forget to make the bird explode or
                // delete bird from array after "birdsplosion"

                // Birds either explode or get vaporized. maybe both if i can do it right.

                // TODO
                //  - bird hit log - done
                //  - bird explode
                //  - bird guts passes log
                //  - bird despawns off screen - done

            }
            
        }
    }

    gameCanvas.clear();

    // background, has to be first so elements get drawns over it
    backgroundImg.speedY = gameSpeed;
    backgroundImg.newPos();
    backgroundImg.update();

    gameCanvas.frameNo += 1;
    if (gameCanvas.frameNo == 1 || everyinterval(150)) {
        x = gameCanvas.canvas.width;
        y = gameCanvas.canvas.height;

        /* TODO

            - Random Placement
            - Randomish flying direction if spawned on the rightside make it fly left.
            - all birds "fall"
            - random bird colors (for testing random gen for random bird images later)
            - random bird sizes?
       
       */

        minHeight = 50;
        maxHeight = 60;
        height = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);

        minWidth = 45;
        maxWidth = 65;
        width = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);

        // maybe gets replaced with 0 so that new birds appear to fly in from the top.
        minY = 30;
        maxY = 400;
        posY = Math.floor(Math.random() * (maxY - minY) + minY);

        minH = 10;
        maxH = 750;
        posH = Math.floor(Math.random() * (maxH - minH) + minH);

        colors = ["red", "blue", "black", "brown", "orange", "grey", "white"];

        minColPik = 0;
        maxColPik = colors.length;
        colorPicker = colors[(Math.floor(Math.random() * (maxColPik - minColPik) + minColPik))]


        birds.push(new component(height, width, colorPicker, posH, (0 - height)));
        

        // birds always fall (log is "flying up")
        birds[(birds.length - 1)].speedY = gameSpeed;

        // make birds go in different directions based on where they spawned
        if (birds[birds.length - 1].x > 400) {
            birds[(birds.length - 1)].speedX = -1;

        } else {
            birds[(birds.length - 1)].speedX = 1;

        }

    }

    for (i = 0; i < birds.length; i += 1) {
        // if statment to make bird turn around near edge of screen?

        if (birds[i].y > 600) {
            // despawn birds
            birds.splice(i, 1);

        } else {
            if (birds[i].x + birds[i].width > 750) {
                // to far right go left now
                birds[i].speedX = -1;
            } else if (birds[i].x < 40) {
                // to far left go right now
                birds[i].speedX = 1;
            }
        }


        birds[i].newPos();
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
    if ((gameCanvas.frameNo / n) % 1 == 0) { 
        return true;

    }
    return false;

}

