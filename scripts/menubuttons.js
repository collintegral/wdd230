const hamButton = document.querySelector("#menu");
const darkButton = document.querySelector("#darkmode");
const body = document.querySelector("body");
const main = document.querySelector("main");
const sections = document.querySelectorAll("section");
const cardlinks = document.querySelectorAll(".card a");
const nav = document.querySelector(".navigation");

hamButton.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamButton.classList.toggle('open');
});

darkButton.addEventListener('click', () => {
    darkButton.classList.toggle('open');
    if (darkButton.textContent.includes("◐")) {
        body.style.background = "#000";
        main.style.color = "#eee";
        sections.forEach(section => {
            section.style.background="#050505";
        });
        cardlinks.forEach(cardlink => {
            cardlink.style.color="#add8e6";
        });
        darkButton.textContent = "◑";
    } else {
        body.style.background = "#fff";
        main.style.color = "#000";
        sections.forEach(section => {
            section.style.background="#fafad2";
        });
        cardlinks.forEach(cardlink => {
            cardlink.style.color="#00008b";
        });
        darkButton.textContent = "◐";
    }
});