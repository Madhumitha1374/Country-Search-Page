let resultCountries = document.getElementById('resultCountries');
let searchInput = document.getElementById('searchInput');
let spinner = document.getElementById('spinner');

let searchInputValue = "";
let data = [];

function createAndAppend(country) {
    let countryEl = document.createElement('div');
    countryEl.classList.add('country-card', 'd-flex', 'col-12', 'col-md-6');
    resultCountries.appendChild(countryEl);

    let flagImg = document.createElement('img');
    flagImg.src = country.flag;
    flagImg.classList.add('country-flag');
    countryEl.appendChild(flagImg);

    let aboutCountry = document.createElement('div');
    aboutCountry.classList.add('d-flex', 'flex-column');
    countryEl.appendChild(aboutCountry);

    let heading = document.createElement('h1');
    heading.classList.add('country-name');
    heading.textContent = country.name;
    aboutCountry.appendChild(heading);

    let populationEl = document.createElement('p');
    populationEl.classList.add('country-population');
    populationEl.textContent = country.population;
    aboutCountry.appendChild(populationEl);
}

function displayCountries() {
    for (let country of data) {
        let countryName = country.name;

        if (countryName.includes(searchInputValue)) {
            createAndAppend(country);
        }
    }
}

function getCountries() {
    let url = 'https://apis.ccbp.in/countries-data';
    let options = {
        method: 'GET'
    };
    resultCountries.textContent = "";
    spinner.classList.remove('d-none');
    resultCountries.classList.add('d-none');


    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinner.classList.add('d-none');
            resultCountries.classList.remove('d-none');

            data = jsonData;
            displayCountries();
        })
}

function searchCountries(event) {
    searchInputValue = event.target.value;
    getCountries()
}
getCountries()
searchInput.addEventListener('keyup', searchCountries);