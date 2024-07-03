const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#password-confirm");
const rating = document.querySelector("#rating");
const ratingField = document.querySelector(".rating-value");

confirmPassword.addEventListener("focusout", compareFields)

function compareFields() {
    if (password.value != confirmPassword.value) {
        window.alert("Passwords do not match. Please re-enter passwords.");
        password.value = "";
        confirmPassword.value = "";
        password.focus();
    }
}

rating.addEventListener("input", updateRatingValue);
rating.addEventListener("change", updateRatingValue);

function updateRatingValue() {
    ratingField.textContent = rating.value;
}