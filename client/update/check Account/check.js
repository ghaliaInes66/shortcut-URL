const loginBtn = document.getElementById('login');
const passwordInput = document.getElementById('pass');
const user_name = document.querySelector('.userName');
const id = localStorage.getItem('userId');
let pass;


fetch(`http://localhost:2000/api/v1/users/${id}`)
.then(res => res.json())
.then(data => {
    console.log(data);
    user_name.innerHTML = data.userName;
})
.catch(err => console.log(err.message))


loginBtn.onclick = () => {
    pass = passwordInput.value;
    sessionStorage.setItem('pass', pass);
    fetch(`http://localhost:2000/api/v1/users/${id}/pass=${pass}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            location.href = '../index.html';
        })
        .catch(err => console.log(err.message));
}