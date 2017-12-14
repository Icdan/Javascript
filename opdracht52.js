var pics = document.getElementById("pics");
var score = 0;
var missers = 0;
var selectedPictures = [];

function createImage (i) {
    var picture = document.createElement("img");
    picture.src = "img/kamehameha.png";
    picture.className = "selection";
    picture.style.border = "3px black solid";
    picture.addEventListener("click", function() {
        picture.style.border = "3px red solid";
        picture.src = "img2/img" + i + ".jpg";
        if(selectedPictures.length < 2) {
            selectedPictures.push(picture);
        }
        if(selectedPictures.length == 2) {
            checkMatch();
        }
    });
    pics.appendChild(picture);
}


function createMonkeyArray() {
    var monkeyNumber = 0;
    var myMonkies = [];

    while(myMonkies.length <= 17) {
        monkeyNumber = Math.floor((Math.random() * 9) + 1);
        if(occurencesInArray(myMonkies, monkeyNumber, 2)) {
            myMonkies.push(monkeyNumber);
        };
    }
    //console.log(myMonkies);
    return myMonkies;
}

function occurencesInArray(arr, str, i) {
    var occ = 0;
    if(arr.length == 0) {
        return true;
    } else {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == str) {
                occ++;
                console.log("occ is: " + occ + ", " + str + "is in " + arr);
            }
        }
        if(occ < 2) {
            return true;
        } else {
            return false;
        }
    }
}

function checkMatch() {
    if(selectedPictures[0].src == selectedPictures[1].src) {
        console.log("zelfde plaatje");
        score++;
        document.getElementById("score_raak").textContent = score;
        selectedPictures = [];
    } else {
        console.log("niet zelfde plaatje");
        missers++;
        document.getElementById("score_missers").textContent = missers;
        setTimeout(clear, 1000)
    }
}

function clear() {
    for(var i = 0; i < 2;i++) {
        selectedPictures[i].style.borderColor = "black";
        selectedPictures[i].src = "img/background.jpg";
    }
    selectedPictures = [];
}

var myMonkies = createMonkeyArray();

for(var i = 0; i < 18; i++) {
    createImage(myMonkies[i]);
}
