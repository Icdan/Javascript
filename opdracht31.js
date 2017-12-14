var plaatjes = document.getElementsByTagName("img");
var random = 0;
var randomPictures = [];

while (randomPictures.length < 9) {
    random = Math.floor(Math.random() * 9) + 1;
    if (randomPictures.lastIndexOf(random) == -1) {
        randomPictures.push(random);
    }

}
random = 0;
for (var plaatje in plaatjes) {
    plaatjes[plaatje].src = "img2/img" + randomPictures[random] + ".jpg";
    random++;
}
