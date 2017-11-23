var pics = [1, 2, 3];
var pics2 = [4, 5, 6];
var pics3 = [7, 8, 9];
var teller = 1;

var slideholder = document.getElementById("slideholder");
slideholder.style.backgroundImage = "url('img/img11.jpg')";

var slideholder2 = document.getElementById("slideholder2");
slideholder2.style.backgroundImage = "url('img/img21.jpg')";

var slideholder3 = document.getElementById("slideholder3");
slideholder3.style.backgroundImage = "url('img/img31.jpg')";

slideholder.addEventListener("click", function () {
    slideholder.style.backgroundImage = "url('img/img1" + getSaiyan() + ".jpg')"
});

slideholder2.addEventListener("click", function () {
    slideholder2.style.backgroundImage = "url('img/img2" + getSaiyan2() + ".jpg')"
});

slideholder3.addEventListener("click", function () {
    slideholder3.style.backgroundImage = "url('img/img3" + getSaiyan3() + ".jpg')"
});

function getSaiyan() {
    teller++;
    console.log(teller);

    if (teller > pics.length) {
        teller = 1;
    }
    return teller;
}

function getSaiyan2() {
    teller++;
    console.log(teller);

    if (teller > pics.length) {
        teller = 1;
    }
    return teller;
}

function getSaiyan3() {
    teller++;
    console.log(teller);

    if (teller > pics.length) {
        teller = 1;
    }
    return teller;
}