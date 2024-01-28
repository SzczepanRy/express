const filters = document.querySelector(".filters");
const popup = document.querySelector(".popup");

filters.addEventListener("click", () => {
    if (popup.style.width == "200px") {
        popup.style.width = "0px";
    } else {
        popup.style.width = "200px";
    }
});

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const mainImageDiv = document.querySelector(".bigImage");
const mainDiv = document.querySelector(".showImage");

function genImage(filter) {
    let image = new Image();

    image.src = mainImageDiv.style.backgroundImage.slice(4, -1).replace(/"/g, "");

    image.onload = function () {
        console.log("runn");
        canvas.width = 600; // testowa szerokość, docelowo trzeba zamienić na rzeczywistą szerokość obrazka
        canvas.height = 400; // testowa wysokość, docelowo trzeba zamienić na rzeczywistą wysokość obrazka
        context.filter = `${filter}(100%)`; // przykładowy filtr
        context.drawImage(image, 0, 0, canvas.width, canvas.height); // obrazek z filtrem widocznym na canvasie
    };
    mainImageDiv.append(canvas);
}

const arrAll = document.querySelectorAll(".el");

Array.from(arrAll).forEach((el) => {
    el.addEventListener("click", (e) => {
        let filter = e.currentTarget.id;
        genImage(filter);
    });
});
