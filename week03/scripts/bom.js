const input = document.getElementById("favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => {
    displayList(chapter);
});

button.addEventListener('click', () => {
    if (input.value != '') {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();
        
        input.value = '';
        input.focus();
    }
    else {
        window.alert("Please enter a scripture.")
    }
});

function displayList(item) {
    let listItem = document.createElement('li');
    let deleteButton = document.createElement('button');
    listItem.textContent = item;
    deleteButton.textContent = "❌";
    deleteButton.addEventListener('click', () => {
        list.removeChild(listItem);
        deleteChapter(listItem.textContent);
        input.focus();
    });
    listItem.append(deleteButton);
    list.append(listItem);
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter((item) => item !== chapter)
    setChapterList();
}

function setChapterList() {
    localStorage.setItem('BOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem('BOMList'));
}