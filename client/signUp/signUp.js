const userName=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');
const passwordConfi=document.getElementById('password-confi');
const submitBtn=document.getElementById('submit');
const error1=document.querySelector('.error1');
const error2=document.querySelector('.error2');
const error3=document.querySelector('.error3');
const error4=document.querySelector('.error4');

submitBtn.addEventListener('click',async ()=>{
    if(userName.value==''){
        error1.textContent='Valid username required';
        return;
    }else error1.textContent=''

    let  valid=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if(!email.value.match( valid) ||email.value==''){
        error2.textContent='Valid email required';
        return;
    }else error2.textContent=''

    if(password.value==''){
        error3.textContent='Valid password required';
        return;
    }else error3.textContent=''
    
    if(password.value.length < 8){
        error3.textContent='Your Password Is Less Than 8 Carchtere, Valid password required';
        return;
    }else error3.textContent=''

    if(password.value!='' && passwordConfi.value==''){
        error4.textContent='please confige your password';
        return;
    }else error4.textContent=''

    if(password.value!='' && passwordConfi.value!='' && passwordConfi.value!==password.value){
        error4.textContent='The password is incorrect';
        return;
    }else error4.textContent=''
    

    const newUser = {
      'userName': userName.value,
      'email': email.value,
      'password': password.value
     }
  
     console.log(newUser.userName);
     console.log(newUser.email);
     console.log(newUser.password);

     await fetch('http://localhost:2000/api/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('userId', data.user.id);
        window.location.href = '../sid ahmed/index.html';
      })
      .catch(err => console.error(err));

})

