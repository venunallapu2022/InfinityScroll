const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready=false;
let imagesLoaded =0;
let totalImages = 0;



let photosArray = [];
// unsplash API
let isInitialLoad = true;
let initialCount = 5;
const apiKey = 'D4sIkqt6tIZokHsjl4BA-_3x9V3ZyN-G5AylFjedbaU';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;


function updateAPIURLWithNewCount(picCount){
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}


// Check if all images are loaded or not

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded ===totalImages){
        ready =true;
    }
}

//helper function to set attributes on Dom Elements

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}




// Create photos displaying

function displayPhotos(){
    imagesLoaded = 0;
    loader.hidden = true;
    //run function for each object
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // createanchor element
        const itm = document.createElement('a');
        setAttributes(itm,{
            href:photo.links.html,
            target:'_blank',
        });
        //creating img tag for photos
        const img = document.createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title: photo.alt_description,
        });

        // event listener check when is finished

        img.addEventListener('load', imageLoaded);

        //Put img tag in anchor tag and  put both inside imageContainer element
        itm.appendChild(img);
        imageContainer.appendChild(itm);
          
    });    
}




// get photos from unsplash api

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) { 
            updateAPIURLWithNewCount(30); 
            isInitialLoad = false ;
        }
    }
    catch (error){
        //catch error here;
    }
}

// check to see if scrolling near bottom of page.load more pages

window.addEventListener('scroll',() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }  
});




// callFunction
getPhotos();