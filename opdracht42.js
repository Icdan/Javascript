var plaatjes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var teller = 1;

var slideholder = document.getElementById("slideholder");
slideholder.style.backgroundImage = "url('img/img1.jpg')";

slideholder.addEventListener("click", function () {
    slideholder.style.backgroundImage = "url('img/img" + getSaiyan() + ".jpg')"
});

function getSaiyan() {
    teller++;
    console.log(teller);

    if (teller > plaatjes.length) {
        teller = 1;
    }
    return teller;
}