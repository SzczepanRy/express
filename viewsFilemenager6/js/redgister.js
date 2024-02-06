window.addEventListener("input", () => {
    console.log("run", document.querySelector(".redgisterBtn"));
    if (document.querySelector(".password").value == document.querySelector(".passwordcheck").value) {
        document.querySelector(".redgisterBtn").style.display = "block"
    } else {
        document.querySelector(".redgisterBtn").style.display = "none"

    }

})