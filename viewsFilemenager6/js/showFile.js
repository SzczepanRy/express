let fontsize = 14;
let color = "white";
const linesEl = document.querySelector(".lines");
const textarea = document.querySelector(".text");

const less = document.querySelector(".less");
const colors = document.querySelector(".colors");
const more = document.querySelector(".more");
const saveStyles = document.querySelector(".saveSytles");


textarea.addEventListener("scroll", () => {
    linesEl.scrollTop = textarea.scrollTop
    linesEl.style.overflow = "hidden"
}
)

window.addEventListener("load", async () => {
    const res = await fetch("http://localhost:3000/getStyles", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const { styles } = await res.json();
    console.log(styles.size);
    fontsize = styles.size;
    color = styles.color;

    textarea.style.fontSize = `${fontsize}px`;
    linesEl.style.fontSize = `${fontsize}px`;

    textarea.style.backgroundColor = color;
    textarea.style.color = color == "black" ? "white" : "black";
    linesEl.style.backgroundColor = color;
    linesEl.style.color = color == "black" ? "white" : "black";

    renderLines();
});

saveStyles.addEventListener("click", async () => {
    //could add error handling
    console.log("as");
    await fetch("http://localhost:3000/saveStyles", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ size: fontsize, color }),
    });
});

less.addEventListener("click", (e) => {
    fontsize -= 1;
    textarea.style.fontSize = `${fontsize}px`;
    linesEl.style.fontSize = `${fontsize}px`;
});
more.addEventListener("click", (e) => {
    fontsize += 1;
    textarea.style.fontSize = `${fontsize}px`;
    linesEl.style.fontSize = `${fontsize}px`;
});
colors.addEventListener("click", () => {
    if (color == "white") {
        color = "black";
    } else {
        color = "white";
    }
    textarea.style.backgroundColor = color;
    textarea.style.color = color == "black" ? "white" : "black";
    linesEl.style.backgroundColor = color;
    linesEl.style.color = color == "black" ? "white" : "black";
});

textarea.addEventListener("keydown", renderLines);

function renderLines() {
    let lines = textarea.value.split("\n");
    linesEl.value = "";
    lines.map((el, i) => {
        linesEl.value += `${i}\n`;
    });
}

const changeName = document.querySelector(".change");
const cancel = document.querySelector(".cancel");
const renameFileForm = document.querySelector("#reamePathForm");

renameFileForm.addEventListener("submit", () => {
    dialog("reamePathDialog", "off");
});

cancel.addEventListener("submit", () => {
    dialog("reamePathDialog", "off");
});

changeName.addEventListener("click", () => {
    dialog("reamePathDialog", "on");
});

const saveButton = document.querySelector(".savefile");
const fileName = document.querySelector(".showFileHeader").innerHTML.split("/")[1];

saveButton.addEventListener("click", async () => {
    let textAreaValue = textarea.value;
    console.log(textAreaValue);
    console.log(fileName);
    await fetch("http://localhost:3000/saveValue", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ textAreaValue, fileName }),
    });
    //could add error handling
});

const view = document.querySelector(".view");

view.addEventListener("click", async (e) => {
    let res = await fetch(`http://localhost:3000/viewfile?name=${fileName}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(res);
    location.href = res.url;
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

