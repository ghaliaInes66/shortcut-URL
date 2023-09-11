const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const id = localStorage.getItem('userId');
const saveBtn = document.getElementById('save');
const cancelBtn = document.getElementById('cancel');
let new_userName;
let new_email;
let new_password;

fetch(`https://url-shortener-mugw.onrender.com/api/v1/users/${id}`)
.then(res => res.json())
.then(data => {
    console.log(data);
    userName.value = data.userName;
    email.value = data.email;
})
.catch(err => console.log(err.message));

saveBtn.onclick = () => {
    let new_userName = userName.value;
    let new_email = email.value;
    let new_password;
    
    if (password.value === "") {
        new_password = sessionStorage.getItem('pass');
    } else {
        new_password = password.value; 
    }

    let update_User = {
        "userName": new_userName,
        "email": new_email,
        "password": new_password
    }
    
    fetch(`https://url-shortener-mugw.onrender.com/api/v1/users/${id}`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update_User)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        location.href = '../user page/index.html'
    })
    .catch(err => console.log(err.message));
}

cancelBtn.onclick= () => {
    location.href = '../user page/index.html'
}