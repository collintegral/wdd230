const input = document.getElementById("favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener('click', () => {
    if (input.value != '') {
        const listItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        listItem.textContent = input.value;
        deleteButton.textContent = " ❌ ";
        deleteButton.addEventListener('click', () => {
            list.removeChild(listItem);
        });
        listItem.append(deleteButton);
        list.append(listItem);
        input.value = '';
        input.focus();
    }
    else {
        window.alert("Please enter a scripture.")
    }
});