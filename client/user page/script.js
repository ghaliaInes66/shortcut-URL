const content = document.querySelector(".content");
const myInp = document.getElementById("linkInp");
const btn = document.querySelector('.btn');
const id = localStorage.getItem('userId');  

const CardShortLink = (shortURL, Url) => {
    return `
    <div class="shortLink">
    <p>=> ${Url}</p>
        <a href=${Url} id="link" >ch.bit/${shortURL}</a>
        <div class="delete-icons">delete</div>
    </div>
   `
}
// get all short_Links
fetch(`https://url-shortener-mugw.onrender.com/api/v1/users/${id}/shortLink`)
.then(res => res.json())
.then(result => {
    content.classList.add("active");
    result.forEach(element => {
        content.innerHTML += CardShortLink(element.ShortURL, element.url); 
    });
})
.catch(err => console.log(err.message));

btn.addEventListener('click', () => {
    const val = myInp.value;
    console.log(val);
    fetch(`https://url-shortener-mugw.onrender.com/api/v1/users/${id}/shortLink`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"url":val})
    })
    .then(res => res.json())
    .then(data => {
        location.reload();
    })
    .catch(err => console.log(err.message));
    
});

setTimeout(() => {
    const deleteIcons = document.querySelectorAll('.delete-icons');
    deleteIcons.forEach(element => {
        element.addEventListener("click", () => {
            const shortUrl = document.getElementById('link').innerHTML.slice(7,);
            fetch(`https://url-shortener-mugw.onrender.com/api/v1/users/${id}/shortLink/${shortUrl}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                element.parentElement.remove();
                location.reload();
            })
            .catch(err => console.log(err.message));
        });
    });
}, 500);


//get user info
const username=document.getElementById('user-name');
const email=document.getElementById('email');

fetch(`https://url-shortener-mugw.onrender.com/api/v1/users/${id}`)
.then(res => res.json())
.then(result => {
    username.textContent=result.userName;
    email.textContent=result.email;
})
.catch(err => console.log(err.message));