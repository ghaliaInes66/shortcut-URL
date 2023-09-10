const content = document.querySelector(".content");
const myInp = document.getElementById("linkInp");
const btn = document.querySelector('.btn');

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
fetch('http://localhost:2000/api/v1/users/64fbc453845524d6ebf08723/shortLink')
.then(res => res.json())
.then(result => {
    content.classList.add("active");
    result.forEach(element => {
        content.innerHTML += CardShortLink(element.ShortURL, element.url); 
        console.log(element);
    });
})
.catch(err => console.log(err.message));

btn.addEventListener('click', () => {
    const val = myInp.value;
    console.log(val);
    fetch('http://localhost:2000/api/v1/users/64fbc453845524d6ebf08723/shortLink', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"url":val})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.result);
        location.reload();
        // const result = data.result;
        // content.innerHTML += CardShortLink(result.ShortURL, result.url);
    })
    .catch(err => console.log(err.message));
    
});

setTimeout(() => {
    const deleteIcons = document.querySelectorAll('.delete-icons');
    deleteIcons.forEach(element => {
        element.addEventListener("click", () => {
            const shortUrl = document.getElementById('link').innerHTML.slice(7,);
            console.log(shortUrl);
            fetch(`http://localhost:2000/api/v1/users/64fbc453845524d6ebf08723/shortLink/${shortUrl}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                element.parentElement.remove();
                location.reload();
            })
            .catch(err => console.log(err.message));
        });
    });
}, 500);