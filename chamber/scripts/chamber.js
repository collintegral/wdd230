const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

document.getElementById("lastmod").innerHTML = `Last Modified ${document.lastModified}`;

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

