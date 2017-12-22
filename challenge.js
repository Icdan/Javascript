var c = document.getElementById('canv'),
    $ = c.getContext("2d");
var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight;

// First image

var img = new Image();
img.src = "img/xmas.png";

img.onload = function () {
    fill_canvas(img);
};

function fill_canvas(img) {
    var canvas = document.getElementById('layer2');
    var ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);       // DRAW THE IMAGE TO THE CANVAS.
}

//Text




var canvas2 = document.getElementById("layer3");
var ctx2 = canvas2.getContext("2d");
ctx2.font = "35px Impact";
ctx2.fillStyle = "#d42426";
ctx2.textAlign = "center";
ctx2.fillText("Merry christmas", canvas2.width/2, canvas2.height/2);
ctx2.fillText("and a happy 2018!", canvas2.width/2, (canvas2.height/2) + 60);


// Second image

var img3 = new Image();
img3.src = "img/xmas.png";

img3.onload = function () {
    fill_canvas3(img3);
};

function fill_canvas3(img) {
    var canvas3 = document.getElementById('layer4');
    var ctx3 = canvas3.getContext('2d');

    canvas3.width = img3.width;
    canvas3.height = img3.height;

    ctx3.drawImage(img, 0, 0);       // DRAW THE IMAGE TO THE CANVAS.
}


Snowy();
function Snowy() {
    var snow, arr = [];
    var num = 600, tsc = 1, sp = 1;
    var sc = 1.3, t = 0, mv = 20, min = 1;
    for (var i = 0; i < num; ++i) {
        snow = new Flake();
        snow.y = Math.random() * (h + 50);
        snow.x = Math.random() * w;
        snow.t = Math.random() * (Math.PI * 2);
        snow.sz = (100 / (10 + (Math.random() * 100))) * sc;
        snow.sp = (Math.pow(snow.sz * .8, 2) * .15) * sp;
        snow.sp = snow.sp < min ? min : snow.sp;
        arr.push(snow);
    }
    go();
    function go(){
        window.requestAnimationFrame(go);
        $.clearRect(0, 0, w, h);
        $.fillStyle = 'hsla(242, 95%, 3%, 1)';
        $.fillRect(0, 0, w, h);
        $.fill();
        for (var i = 0; i < arr.length; ++i) {
            f = arr[i];
            f.t += .05;
            f.t = f.t >= Math.PI * 2 ? 0 : f.t;
            f.y += f.sp;
            f.x += Math.sin(f.t * tsc) * (f.sz * .3);
            if (f.y > h + 50) f.y = -10 - Math.random() * mv;
            if (f.x > w + mv) f.x = - mv;
            if (f.x < - mv) f.x = w + mv;
            f.draw();}
    }
    function Flake() {
        this.draw = function() {
            this.g = $.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
            this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
            this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
            $.moveTo(this.x, this.y);
            $.fillStyle = this.g;
            $.beginPath();
            $.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
            $.fill();}
    }
}
/*________________________________________*/
window.addEventListener('resize', function(){
    c.width = w = window.innerWidth;
    c.height = h = window.innerHeight;
}, false);

//

// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
// not supported in all browsers though and sometimes needs a prefix, so we need a shim
window.requestAnimFrame = ( function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ) {
            window.setTimeout( callback, 1000 / 60 );
        };
})();

// now we will setup our basic variables for the demo
var canvoos = document.getElementById( 'canvoos' ),
    contooxt = canvoos.getContext( '2d' ),
    // full screen dimensions
    cw = window.innerWidth,
    ch = window.innerHeight,
    // firework collection
    fireworks = [],
    // particle collection
    particles = [],
    // starting hue
    hue = 120,
    // when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
    limiterTotal = 5,
    limiterTick = 0,
    // this will time the auto launches of fireworks, one launch per 80 loop ticks
    timerTotal = 40,
    timerTick = 0,
    mousedown = false,
    // mouse x coordinate,
    mx,
    // mouse y coordinate
    my;

// set canvas dimensions
canvoos.width = cw;
canvoos.height = ch;

// now we are going to setup our function placeholders for the entire demo

// get a random number within a range
function random( min, max ) {
    return Math.random() * ( max - min ) + min;
}

// calculate the distance between two points
function calculateDistance( p1x, p1y, p2x, p2y ) {
    var xDistance = p1x - p2x,
        yDistance = p1y - p2y;
    return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
}

// create firework
function Firework( sx, sy, tx, ty ) {
    // actual coordinates
    this.x = sx;
    this.y = sy;
    // starting coordinates
    this.sx = sx;
    this.sy = sy;
    // target coordinates
    this.tx = tx;
    this.ty = ty;
    // distance from starting point to target
    this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
    this.distanceTraveled = 0;
    // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = 3;
    // populate initial coordinate collection with the current coordinates
    while( this.coordinateCount-- ) {
        this.coordinates.push( [ this.x, this.y ] );
    }
    this.angle = Math.atan2( ty - sy, tx - sx );
    this.speed = 2;
    this.acceleration = 1.05;
    this.brightness = random( 50, 70 );
    // circle target indicator radius
    this.targetRadius = 1;
}

// update firework
Firework.prototype.update = function( index ) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift( [ this.x, this.y ] );

    // cycle the circle target indicator radius
    if( this.targetRadius < 8 ) {
        this.targetRadius += 0.3;
    } else {
        this.targetRadius = 1;
    }

    // speed up the firework
    this.speed *= this.acceleration;

    // get the current velocities based on angle and speed
    var vx = Math.cos( this.angle ) * this.speed,
        vy = Math.sin( this.angle ) * this.speed;
    // how far will the firework have traveled with velocities applied?
    this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );

    // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
    if( this.distanceTraveled >= this.distanceToTarget ) {
        createParticles( this.tx, this.ty );
        // remove the firework, use the index passed into the update function to determine which to remove
        fireworks.splice( index, 1 );
    } else {
        // target not reached, keep traveling
        this.x += vx;
        this.y += vy;
    }
}

// draw firework
Firework.prototype.draw = function() {
    contooxt.beginPath();
    // move to the last tracked coordinate in the set, then draw a line to the current x and y
    contooxt.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
    contooxt.lineTo( this.x, this.y );
    contooxt.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
    contooxt.stroke();

    contooxt.beginPath();
    // draw the target for this firework with a pulsing circle
    contooxt.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
    contooxt.stroke();
}

// create particle
function Particle( x, y ) {
    this.x = x;
    this.y = y;
    // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = 5;
    while( this.coordinateCount-- ) {
        this.coordinates.push( [ this.x, this.y ] );
    }
    // set a random angle in all possible directions, in radians
    this.angle = random( 0, Math.PI * 2 );
    this.speed = random( 1, 10 );
    // friction will slow the particle down
    this.friction = 0.95;
    // gravity will be applied and pull the particle down
    this.gravity = 1;
    // set the hue to a random number +-50 of the overall hue variable
    this.hue = random( hue - 50, hue + 50 );
    this.brightness = random( 50, 80 );
    this.alpha = 1;
    // set how fast the particle fades out
    this.decay = random( 0.015, 0.03 );
}

// update particle
Particle.prototype.update = function( index ) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift( [ this.x, this.y ] );
    // slow down the particle
    this.speed *= this.friction;
    // apply velocity
    this.x += Math.cos( this.angle ) * this.speed;
    this.y += Math.sin( this.angle ) * this.speed + this.gravity;
    // fade out the particle
    this.alpha -= this.decay;

    // remove the particle once the alpha is low enough, based on the passed in index
    if( this.alpha <= this.decay ) {
        particles.splice( index, 1 );
    }
}

// draw particle
Particle.prototype.draw = function() {
    contooxt. beginPath();
    // move to the last tracked coordinates in the set, then draw a line to the current x and y
    contooxt.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
    contooxt.lineTo( this.x, this.y );
    contooxt.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
    contooxt.stroke();
}

// create particle group/explosion
function createParticles( x, y ) {
    // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
    var particleCount = 30;
    while( particleCount-- ) {
        particles.push( new Particle( x, y ) );
    }
}

// main demo loop
function loop() {
    // this function will run endlessly with requestAnimationFrame
    requestAnimFrame( loop );

    // increase the hue to get different colored fireworks over time
    //hue += 0.5;

    // create random color
    hue= random(0, 360 );

    // normally, clearRect() would be used to clear the canvas
    // we want to create a trailing effect though
    // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
    contooxt.globalCompositeOperation = 'destination-out';
    // decrease the alpha property to create more prominent trails
    contooxt.fillStyle = 'rgba(0, 0, 0, 0.5)';
    contooxt.fillRect( 0, 0, cw, ch );
    // change the composite operation back to our main mode
    // lighter creates bright highlight points as the fireworks and particles overlap each other
    contooxt.globalCompositeOperation = 'lighter';

    // loop over each firework, draw it, update it
    var i = fireworks.length;
    while( i-- ) {
        fireworks[ i ].draw();
        fireworks[ i ].update( i );
    }

    // loop over each particle, draw it, update it
    var i = particles.length;
    while( i-- ) {
        particles[ i ].draw();
        particles[ i ].update( i );
    }

    // launch fireworks automatically to random coordinates, when the mouse isn't down
    if( timerTick >= timerTotal ) {
        if( !mousedown ) {
            // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
            fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );
            timerTick = 0;
        }
    } else {
        timerTick++;
    }

    // limit the rate at which fireworks get launched when mouse is down
    if( limiterTick >= limiterTotal ) {
        if( mousedown ) {
            // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
            fireworks.push( new Firework( cw / 2, ch, mx, my ) );
            limiterTick = 0;
        }
    } else {
        limiterTick++;
    }
}

// mouse event bindings
// update the mouse coordinates on mousemove
canvoos.addEventListener( 'mousemove', function(e ) {
    mx = e.pageX - canvoos.offsetLeft;
    my = e.pageY - canvoos.offsetTop;
});

// toggle mousedown state and prevent canvas from being selected
canvoos.addEventListener( 'mousedown', function(e ) {
    e.preventDefault();
    mousedown = true;
});

canvoos.addEventListener( 'mouseup', function(e ) {
    e.preventDefault();
    mousedown = false;
});

// once the window loads, we are ready for some fireworks!
window.onload = loop;


//

