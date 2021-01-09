const apiKey = "563492ad6f917000010000018597ec50a9cc44ef87fb8da4704db5f8";

const gallerySection = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
const moreButton = document.querySelector(".more-button");


let searchValue = "";
let searchQuery = "";
let page = 1;


moreButton.addEventListener("click",updateGallery);

searchInput.addEventListener("input",(e)=>{

    searchValue = e.target.value;

});


searchForm.addEventListener("submit",(e)=>{

    e.preventDefault();
    page = 1;
    clearGallery();
    if(searchValue != ""){
        searchedGallery(searchValue);
    }
    else{
        curatedGallery();
        searchQuery = "";
    }

});


async function fetchData(url){

    const dataFetch = await fetch(url,{
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization:apiKey
        }
    });

    const data = await dataFetch.json();
    return data;
}

function clearGallery(){

    gallerySection.innerHTML = "";

}

function setGallery(photos){


    photos.forEach(photo => {

        console.log(photo);

        const photoDiv = document.createElement("div");
        photoDiv.classList.add("photo-section");
        photoDiv.innerHTML = `
        <div class="photo-info">
            <p>${photo.photographer}</p>
            <a href="${photo.src.large}" target="_blank">Download</a>
        </div>
        <img src="${photo.src.large}"></img>
        `;

        gallerySection.appendChild(photoDiv);

        
    });

}

async function curatedGallery(){
    const curatedUrl = `https://api.pexels.com/v1/curated?per_page=10&page=${page}`;
    const data = await fetchData(curatedUrl);

    
    setGallery(data.photos);
    
    
}


async function searchedGallery(query){


    searchQuery = query;
    const searchUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${page}`;
    const data = await fetchData(searchUrl);

  
    setGallery(data.photos);

}


function updateGallery(){

    page++;

    if(searchQuery != ""){
        searchedGallery(searchQuery);
    }
    else{
        curatedGallery();
    }


}


curatedGallery();