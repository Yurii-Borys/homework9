const btn = document.querySelector('#btn');
btn.addEventListener('click', search);
let startPages=1;



const constants = {
	BASE_URL:
		"https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=847b43221e688059973358acc1294ba5",
	STORAGE_KEY: "flicker_search_queries"
};


async function search(startPages) {
    console.log(startPages);
    
    const qNumber=document.querySelector('#number'); //find Q-photo

    const query = document.querySelector('#query');
    let res = await getPhotos(query.value,qNumber.value,startPages);
    
    const urls = res.photos.photo.map(getImageUrl);
    displayResult(urls);


    console.log(res);
    console.log(urls);
}


async function getPhotos(query,quintaty,startPages) {
  
    

    const url = constants.BASE_URL + "&text=" + query +"&per_page="+quintaty+"&page="+startPages;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
    
    const data = await response.json()
    return data;
}


function getImageUrl({ farm, server, id, secret }) {
	return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
}

function displayResult(items = []) {
    const result = document.querySelector('#result');
    const images = items.map(url => `<img src="${url}" />`);

    // const images = items.map(url => "<img src=" + url + " />");
    // [url] -> [img]
    // https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg` => <img src="{url}" />

    result.innerHTML = images;
}

//panaginatio

let next=document.querySelector('.next');
next.addEventListener('click', nextPages);

function nextPages () {
    startPages++;
    previous.disabled=false;
    return search(startPages);
}

let previous=document.querySelector('.previous');
previous.addEventListener('click', previousPages);

function previousPages () {
if (startPages===1) {
    previous.disabled=true;
}
  else  startPages--;
return search(startPages);
}

//number from 1 to 3

let one=document.querySelector('.one');
let two=document.querySelector('.two');
let three=document.querySelector('.three');

one.addEventListener('click',changeNumberOne);
two.addEventListener('click',changeNumberTwo);
three.addEventListener('click',changeNumberThree);

previous.disabled=true;

function changeNumberOne () {
    startPages=one.value;
    previous.disabled=true;
    return search(startPages);
}

function changeNumberTwo () {
    startPages=two.value;
    previous.disabled=false;
    return search(startPages);
}

function changeNumberThree () {
    startPages=three.value;
    previous.disabled=false;
    return search(startPages);
}