pics = document.getElementById("pics");
createPicsHolders();
createSaiyanPics();

function createPicsHolders() {
    for (var i = 0; i < 9; i++) {
        pictureHolder = document.createElement("div");
        pictureHolder.className = "picture-holder";
        pictureHolder.id = "picture-holder-" + i;
        pics.appendChild(pictureHolder);
    }
}

function createSaiyanPics() {
    pictureHolders = document.getElementsByClassName("picture-holder");
    for (var i = 0; i < pictureHolders.length; i++){
        favoriet = document.createElement("div");
        favoriet.className = "favoriet";
        favoriet.id = "favoriet_" + (i + 1);
        kamehameha = document.createElement("img");
        kamehameha.src = "img2/img" + (i + 1) + ".jpg";
        kamehameha.id = (i + 1);
        kamehameha.addEventListener("click", function() {
            makeFav(this.id);
        });
        pictureHolders[i].appendChild(favoriet);
        pictureHolders[i].appendChild(kamehameha);

    }
}
function makeFav(id) {
    notfav = document.getElementsByClassName("favoriet");

    for (var i = 0; i < notfav.length; i++){
        notfav[i].style.backgroundImage = "none";
    }

    favoriet = document.getElementById("favoriet_" + id);
    favoriet.style.backgroundImage = "url('img/heart.png')";
}

