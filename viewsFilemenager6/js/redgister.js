// window.addEventListener("input", () => {
//     console.log("run", document.querySelector(".redgisterBtn"));
// });

const form = document.querySelector(".redgisterForm");
const login = document.querySelector(".login");
const password = document.querySelector(".password");
const passwordcheck = document.querySelector(".passwordcheck");
const redgisterBtn = document.querySelector(".redgisterBtn");
const p = document.querySelector(".p");

redgisterBtn.addEventListener("click", async () => {
    console.log(login.value);
    if (password.value == passwordcheck.value) {
        let res = await fetch("http://localhost:3000/postRedgister", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login: login.value,
                password: password.value,
            }),
        });
        console.log(res);
        location.href = res.url;
        if (res.message) {
            p.innerHTML = res.message;
        }
        // document.querySelector(".redgisterBtn").style.display = "block";
    } else {
        p.innerHTML = "passwords do not match";

        // document.querySelector(".redgisterBtn").style.display = "none";
    }
});
