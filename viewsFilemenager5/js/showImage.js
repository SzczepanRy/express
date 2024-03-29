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

const renameButton = document.querySelector(".rename");
renameButton.addEventListener("click", (e) => {
    const path = e.currentTarget.id;
    console.log(path);

    dialog("renameImageDialog", "on");
});

const cancel = document.querySelector(".cancel");
cancel.addEventListener("click", () => {
    dialog("renameImageDialog", "off");
});

const viewButton = document.querySelector(".viewImage");
viewButton.addEventListener("click", async (e) => {
    let path = e.currentTarget.id;
    // console.log(path);
    // path = path.split("/")[path.split("/").length - 1];
    // console.log("fetchujeemy" + path);
    // let res = await fetch(`/viewImg?name=${path}`, {
    //     method: "get",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // });
    location.href = path;
});

const saveButton = document.querySelector(".save");
saveButton.addEventListener("click", async (e) => {
    const path = e.currentTarget.id;
    console.log("ok save");

    let dataUrl = canvas.toDataURL("image/jpeg");

    let res = await fetch("/saveImg", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dataUrl: dataUrl,
            path: path,
        }),
    });
    let data = await res.json();
    console.log(data.message);
});

function dialog(name, on) {
    console.log("AAA");
    const dialog = document.querySelector(`#${name}`);
    if (on == "on") {
        dialog.showModal();
    } else if (on == "off") {
        dialog.close();
        // window.location.reload();
    }
}
