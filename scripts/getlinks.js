const practiceList = document.querySelector("#practice-list");

const baseURL = "https://collintegral.github.io/wdd230/";
//const linksJSON = "https://collintegral.github.io/wdd230/data/links.json";
const linksJSON = "../data/links.json";

async function getLinks() {
    const response = await fetch(linksJSON);
    const data = await response.json();
    displayLinks(data.weeks);
}

function displayLinks(weeks) {

    weeks.forEach(week => {
        const weekLi = document.createElement("li");
        weekLi.innerHTML = `${week.week}: `;

        week.links.forEach((link, amt, array) => {
            console.log("test");
            const linkA = document.createElement("a");
            linkA.src = link.url;
            linkA.textContent = link.title;

            weekLi.appendChild(linkA);
            if (amt !== array.length - 1) {
                weekLi.append(" | ");
            }
        })

        practiceList.appendChild(weekLi);
    });
}

getLinks();