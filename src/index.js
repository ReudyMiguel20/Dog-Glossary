const content = document.getElementById('content');
const buttonRandomDog = document.getElementById('button-random-dog');
const buttonShowBreed = document.getElementById('button-show-breed');
const inputBreed = document.getElementById('input-breed');

<!--Button Events-->
buttonRandomDog.addEventListener('click', function () {
    content.innerHTML = ''; // clear content
    getDogImage();
});

buttonShowBreed.addEventListener('click', function () {
    content.innerHTML = ''; // clear content
    getBreedImage();
});


<!--Functions-->
function getBreed() {
    return inputBreed.value;
}

// get dog image from api and append to content div
async function getDogImage() {
    try {
        // 1. fetch() is a function that returns a promise
        // 2. await is used to wait for the promise to resolve
        // 3. response.json() is a function that returns a promise
        // 4. await is used to wait for the promise to resolve
        // 5. data.message is the url of the image
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        const img = document.createElement('img');
        img.src = data.message;

        return content.appendChild(img);
    } catch {
        console.log('error');
    }

}

// get specific breed image from api and append to content div
async function getBreedImage() {
    // get breed from input and convert to lowercase
    let breed = getBreed().toLowerCase();

    // fetch image from api and convert to json format
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();

    // create img element and set src to image url
    const img = document.createElement('img');
    img.src = data.message;

    // if breed not found, display error message, else display image
    if (data.status === 'error') {
        const notFound = document.createElement('p');
        notFound.innerText = 'Breed not found!';
        return content.appendChild(notFound);
    } else {
        return content.appendChild(img);
    }
}