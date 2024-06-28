const visitDiv = document.querySelector('.last-visit');
const msToDays = 84600000;
const today = Date.now();

let lastVisit = parseInt(localStorage.getItem('last-visit')) || 0;

if (lastVisit == 0)
    {
        visitDiv.textContent = "Welcome! Let us know if you have any questions.";
    }
else if (today - lastVisit < msToDays)
{
    visitDiv.textContent = "Back so soon! Awesome!";
}
else if (Math.floor((today - lastVisit) / msToDays) < 2)
{
   visitDiv.textContent = "You last visited 1 day ago.";
}
else
{
    visitDiv.textContent = `You last visited ${Math.floor((today - lastVisit) / msToDays)} days ago.`;
}
    

localStorage.setItem('last-visit', today);