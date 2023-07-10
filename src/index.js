<!--Variables for DOM elements-->
const content = document.getElementById('content');
const inputBreed = document.getElementById('input-breed');
const buttonRandomDog = document.getElementById('button-random-dog');
const buttonShowBreed = document.getElementById('button-show-breed');
const buttonShowSubBreed = document.getElementById('button-show-sub-breed');
const buttonShowAll = document.getElementById('button-show-all');


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

buttonShowAll.addEventListener('click', function () {
    content.innerHTML = ''; // clear content
    getAllBreeds();
});


<!--Functions-->
function getInput() {
    return inputBreed.value;
}

// Get random dog image from api and append to content div
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

// Get specific breed image from api and append to content div
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


// This function gets the sub-breed of a specific breed and displays it in an ordered list format
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

async function getAllBreeds() {
    // fetch image from api and convert to json format (array) - returns an array of sub-breeds
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();

    // create ordered list element
    const listAllBreeds = document.createElement('ol');

    // create array of breeds
    const breeds = Object.keys(data.message);
    const subBreeds = Object.values(data.message);

    // loop through array and create list item (li) for each sub-breed and append to ordered list element (ol)
    for (let i = 0; i < breeds.length; i++) {
        if (subBreeds[i].length === 0) {
            console.log(i + 'is empty');
        } else {
            console.log(i + 'contains something');
        }


        if (subBreeds[i].length === 0) {
            // Create a new list item (li) for each breed and appends it to the ordered list (ol)
            const breed = document.createElement('li');
            breed.innerHTML = breeds[i]
            listAllBreeds.appendChild(breed);

        } else if (subBreeds[i].length > 0) {
            // Create a new list item (li) for each breed and appends it to the ordered list (ol)
            const breed = document.createElement('li');
            breed.innerHTML = breeds[i]

            // Creates a new unordered list (ul) for each breed and appends it to the list item (li)
            for (let j = 0; j < subBreeds[i].length; j++) {
                const subBreedsList = document.createElement('ul')
                const subBreed = document.createElement('li');

                // Creates a new list item (li) for each sub-breed and appends it to the unordered list (ul)
                subBreed.innerHTML = subBreeds[i][j];

                // Appends the unordered list (ul) to the list item (li)
                listAllBreeds.appendChild(breed);
                subBreedsList.appendChild(subBreed);
                breed.appendChild(subBreedsList);
            }
        }
    }
    // append ordered list to content div
    return content.appendChild(listAllBreeds);
}