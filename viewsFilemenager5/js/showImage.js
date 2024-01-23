const filters = document.querySelector(".filters")
const popup = document.querySelector(".popup")


filters.addEventListener('click', () => {
    if (popup.style.width == "200px") {
        popup.style.width = "0px"
    } else {
        popup.style.width = "200px"

    }
})