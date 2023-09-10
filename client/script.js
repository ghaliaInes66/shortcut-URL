const inputURL = document.getElementById('longurl');
const shortLink = document.getElementById('shorturl');
const shorten = document.getElementById('shorten');
const SignBtn = document.getElementById('sing');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');

registerBtn.onclick = () => {
    window.location.href = "./signup/signUp.html";
}

loginBtn.onclick = () => {
    window.location.href = "./login/login.html";
}

SignBtn.onclick = () => {
    window.location.href = "./signup/signUp.html";
}

shorten.addEventListener('click', () => {
    alert("you shoud sig up to see your short Links");
});