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
ctx2.font = "35px Arial";
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

