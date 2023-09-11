const loginBtn = document.getElementById('login');
const passwordInput = document.getElementById('pass');
const user_name = document.querySelector('.userName');
const id = localStorage.getItem('userId');
let pass;


fetch(`https://url-shortener-mugw.onrender.com/api/v1/users/${id}`)
.then(res => res.json())
.then(data => {
    user_name.innerHTML = data.userName;
})
.catch(err => console.log(err.message))


loginBtn.onclick = async() => {
    pass = passwordInput.value;
    sessionStorage.setItem('pass', pass);
    await fetch(`https://url-shortener-mugw.onrender.com/api/v1/users/${id}/pass=${pass}`)
        .then(res => res.json())
        .then(data => {
            location.href = '../index.html';
        })
        .catch(err => console.log(err.message));
}