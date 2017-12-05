img1.addEventListener("click", addImage1);
img2.addEventListener("click", addImage2);
img3.addEventListener("click", addImage3);
img4.addEventListener("click", addImage4);
img5.addEventListener("click", addImage5);
img6.addEventListener("click", addImage6);
img7.addEventListener("click", addImage7);
img8.addEventListener("click", addImage8);
img9.addEventListener("click", addImage9);

function clearImages() {
    for (var i = 1; i < 10; i++) {
        document.getElementById("extra" + i).src = "";
    }
}

function addImage1() {
    clearImages();
    document.getElementById("extra1").src = "img/heart.png";
}

function addImage2() {
    clearImages();
    document.getElementById("extra2").src = "img/heart.png";
}

function addImage3() {
    clearImages();
    document.getElementById("extra3").src = "img/heart.png"
}

function addImage4() {
    clearImages();
    document.getElementById("extra4").src = "img/heart.png";
}

function addImage5() {
    clearImages();
    document.getElementById("extra5").src = "img/heart.png";
}

function addImage6() {
    clearImages();
    document.getElementById("extra6").src = "img/heart.png";
}

function addImage7() {
    clearImages();
    document.getElementById("extra7").src = "img/heart.png";
}

function addImage8() {
    clearImages();
    document.getElementById("extra8").src = "img/heart.png";
}

function addImage9() {
    clearImages();
    document.getElementById("extra9").src = "img/heart.png";
}


