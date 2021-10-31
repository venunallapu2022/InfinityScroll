const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
// unsplash API

const count = 10;
const apiKey = 'D4sIkqt6tIZokHsjl4BA-_3x9V3ZyN-G5AylFjedbaU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get photos from unsplash api

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    }
    catch(error){
        //catch error here;
    }
}

// callFunction
getPhotos();