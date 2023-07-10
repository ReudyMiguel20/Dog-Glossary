const content = document.getElementById('content');
const button = document.getElementById('button-random-dog');

button.addEventListener('click', function() {
    content.innerHTML = ''; // clear content
    getDogImage();
});

async function getDogImage() {
    try{
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        const img = document.createElement('img');
        img.src = data.message;

        return content.appendChild(img);
    }
    catch {
        console.log('error');
    }

}