const practiceList = document.querySelector("#practice-list");

const baseURL = "https://collintegral.github.io/wdd230/";
const linksJSON = "https://collintegral.github.io/wdd230/data/links.json";

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
            const linkA = document.createElement("a");
            linkA.href = link.url;
            linkA.textContent = link.title;

            weekLi.append(linkA);
            if (amt !== array.length - 1) {
                weekLi.append(" | ");
            }
        })

        practiceList.appendChild(weekLi);
    });
}

getLinks();