<!--Variables for DOM elements-->
const content = document.getElementById('content');
const buttonRandomDog = document.getElementById('button-random-dog');
const buttonShowBreed = document.getElementById('button-show-breed');
const buttonShowSubBreed = document.getElementById('button-show-sub-breed');
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

buttonShowSubBreed.addEventListener('click', function () {
    content.innerHTML = ''; // clear content
    getSubBreed();
});


<!--Functions-->
function getInput() {
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
    let breed = getInput().toLowerCase();

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


async function getSubBreed() {
    // get breed from input and convert to lowercase
    const subBreed = getInput().toLowerCase();

    // fetch image from api and convert to json format (array) - returns an array of sub-breeds
    const response = await fetch(`https://dog.ceo/api/breed/${subBreed}/list`);
    const data = await response.json();

    // if breed not found, display error message, else display image of sub-breed list in an ordered list format (ol)
    if (data.status === 'error') {
        const notFound = document.createElement('p');
        notFound.innerText = 'Breed not found!';
        return content.appendChild(notFound);
    } else if (data.message.length === 0) {
        const notFound = document.createElement('p');
        notFound.innerText = 'No sub-breeds found!';
        return content.appendChild(notFound);
    } else {
        // create ordered list element
        const listSubBreed = document.createElement('ol');

        // loop through array and create list item (li) for each sub-breed
        for (let i = 0; i < data.message.length; i++) {
            const subBreeds = document.createElement('li');
            subBreeds.innerHTML = data.message[i];
            listSubBreed.appendChild(subBreeds);
        }

        // append ordered list to content div
        return content.appendChild(listSubBreed);
    }
}