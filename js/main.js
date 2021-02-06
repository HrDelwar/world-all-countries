//get id
function getId(id) {
    return document.getElementById(id);
}

// get rest countries data with api
async function getCountriesData() {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await response.json();
    displayCountries(data);// call data display function
}
getCountriesData();// first call for initialize function

// display countries name and capital
function displayCountries(data) {
    //start loop for catch data and display data
    data.forEach(country => {
        const countryName = country.name;// catch country name
        const countryCapital = country.capital;// catch country capital name
        const countryFlag = country.flag; // catch country flag
        const parentElement = document.getElementById('parent');// catch parent element
        let child = document.createElement('div');// create new child element 
        const classList = ['col-md-6', 'col-lg-4', 'col-xl-3', 'p-3']; // add class array for child element
        child.classList.add(...classList); // add class child element

        // create template for display data
        child.innerHTML = `
        <div class = ''> 
        <div class="card">
            <img src="${countryFlag}" class="card-img-top" alt="...">
            <div class="card-body">
                <div>
                    <h5 class="card-title">Country: ${countryName}</h5>
                    <h6 class=''>Capital: ${countryCapital}</h6>
                </div>
                <!-- Button trigger modal -->
                <button data-country='${countryName}' type="button" class=" btn-custom  text-uppercase d-block mx-auto mt-3 click-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <span  class='high-z-index'>details</span>
                </button>
            </div>
         </div>
        </div>
        
        `;
        parentElement.appendChild(child); // append child 
    });// end loop

    //add click event for details button
    const className = document.getElementsByClassName('click-btn');//catch class name HTML-collection
    for (element of className) {
        //add click event listener
        element.addEventListener('click', function (event) {
            event.stopPropagation();// stop bubbling
            let country = event.target.getAttribute('data-country');// get country name in attribute
            if (!country) {
                country = event.target.parentNode.getAttribute('data-country');
            }
            detailsData(country);// call data details
        })
    }
}

//get country details data from api
async function detailsData(country) {
    getId('modal-body').style.display = 'none';//data hide for loading
    const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);//fetch api data
    const data = await response.json();
    displayDetailsData(data); // call display details data
    getId('spinner').style.display = 'none';// spinner hide when data load complete
    getId('modal-body').style.display = 'block';//data show when load complete
}

//display details data for every country
function displayDetailsData(data) {
    const country = data[0];
    const flag = country.flag;//catch country flag
    const name = country.name;// catch country name
    const capital = country.capital;//catch country capital
    const subregion = country.subregion;//catch country subregion
    const callingCodes = country.callingCodes[0];//catch country callingCodes
    const language = country.languages[0].name;//catch country language
    const currency = country.currencies[0].name;//catch country currency
    const area = country.area;//catch country area
    const population = country.population;//catch country population
    const altSpellings = country.altSpellings[1];//catch country altSpellings
    const timezones = country.timezones[0];//catch country timezones


    //displaying
    getId('country-flag').src = flag;//display country flag
    getId('country-name').innerText = name;//display country name
    getId('country-subregion').innerText = subregion;//display country name
    getId('capital').innerText = capital;//display country capital
    getId('phone-code').innerText = '+' + callingCodes;//display country countryCallingCodes
    getId('language').innerText = language;//display country language
    getId('timezones').innerText = timezones;//display country timezones
    getId('currency').innerText = currency;//display country currency
    if (altSpellings) {
        getId('altSpellings').innerText = altSpellings;//display country altSpellings
    }
    getId('area').innerText = area + ' km²';//display country area
    getId('population').innerText = (population / 1000000).toFixed(1) + " Million (2019) World Bank.";//display country population

}

function stop(event) {
    console.log('object');

    console.log(event.target.parentNode.onclick);
}