const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json(response);

    displayProphets(data.prophets);
}

const displayProphets = prophets => {
    prophets.forEach(prophet => {
        let card = document.createElement("section");
        let h2 = document.createElement("h2");
        h2.textContent = `${prophet.name} ${prophet.lastname}`

        let pdate = document.createElement("p");
        pdate.textContent = `Date of Birth: ${prophet.birthdate}`;

        let pplace = document.createElement("p");
        pplace.textContent = `Place of Birth: ${prophet.birthplace}`;

        let img = document.createElement("img");
        img.src = prophet.imageurl;
        img.alt = `Portrait of ${h2.textContent}`;
        img.loading = "lazy";
        img.width = 330;
        img.height = 440;

        card.appendChild(h2);
        card.appendChild(pdate);
        card.appendChild(pplace);
        card.appendChild(img);
        cards.appendChild(card);
    });
}

getProphetData();