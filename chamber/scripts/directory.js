const directory = document.querySelector(".business-display");
const gridToggle = document.querySelector("#toggle");
const fileSource = "data/directory.json"

async function getBusinessData() {
    const response = await fetch(fileSource);
    const data = await response.json();
    displayBusinessData(data.companies);
}

function displayBusinessData(businesses) {
    businesses.forEach(business => {
        let businessCard = document.createElement('div');

        let logoIcon = document.createElement('img');
        logoIcon.src = `images/${business.icon}`;
        logoIcon.alt = `${business.name} Logo`;
        logoIcon.width = 300;
        logoIcon.height = 150;

        let businessName = document.createElement('p');
        businessName.textContent = business.name;

        let businessAddress = document.createElement('p');
        businessAddress.textContent = business.address;

        let businessPhone = document.createElement('p');
        businessPhone.textContent = business.phone;

        let businessSite = document.createElement('a');
        businessSite.href = business.weblink;
        businessSite.textContent = business.weblink;

        businessCard.appendChild(logoIcon);
        businessCard.appendChild(businessName);
        businessCard.appendChild(businessAddress);
        businessCard.appendChild(businessPhone);
        businessCard.appendChild(businessSite);

        directory.appendChild(businessCard);
    });
}

getBusinessData();

gridToggle.addEventListener('change', () => {
    directory.classList.toggle("grid");
    directory.classList.toggle("list");
});