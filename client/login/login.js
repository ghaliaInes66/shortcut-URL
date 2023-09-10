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
    
    const userN = userName.value;
    const pass = password.value;

    await fetch(`http://localhost:2000/api/v1/users/userName=${userN}&&pass=${pass}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('userId', data._id);
        window.location.href = '../sid ahmed/index.html';
      })
      .catch(err => console.log(err));
})