const visitDisplay = document.querySelector(".visits");

let numVisits = Number(localStorage.getItem('numVisits')) || 0;

numVisits++;

visitDisplay.textContent = numVisits;

localStorage.setItem('numVisits', numVisits);

