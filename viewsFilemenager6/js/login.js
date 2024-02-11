const form = document.querySelector(".loginForm");
const login = document.querySelector(".login");
const password = document.querySelector(".password");
const loginBtn = document.querySelector(".loginBtn");
const p = document.querySelector(".p");

loginBtn.addEventListener("click", async () => {
    console.log(login.value);

    let res = await fetch("http://localhost:3000/postLogin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: login.value,
            password: password.value,
        }),
    });
    console.log(res.message);
    location.href = res.url;
    if (res.message) {
        p.innerHTML = res.message;
    }
    // document.querySelector(".loginBtn").style.display = "block";

    // document.querySelector(".loginBtn").style.display = "none";
});
