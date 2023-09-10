const userName=document.getElementById('username');
const password=document.getElementById('password');
const submitBtn=document.getElementById('submit');
const error1=document.querySelector('.error1');
const error2=document.querySelector('.error2');

submitBtn.addEventListener('click',async ()=>{
    if(userName.value==''){
        error1.textContent='Valid username required';
        return;
    }else error1.textContent=''
    
    if(password.value==''){
        error2.textContent='Valid password required';
        return;
    }else error2.textContent=''

    const loginUser = {
        'userName': userName.value,
        'password': password.value
    }
    
    console.log(loginUser.userName);
    console.log(loginUser.password);

    await fetch(' http://localhost:2000/api/v1/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginUser)
       })
      .then(res => res.json())
      .then(data => {
        window.location.href = 'C:\Users\Ines\Documents\myWebSiteWork\shortcut-URL\client\index.html';
      })
      .catch(err => console.error(err)); 
})