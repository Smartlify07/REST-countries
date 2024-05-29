import { fetchCountries } from "./fetchCountries.js";

const countries = await fetchCountries();
const countriesGrid = document.querySelector(".countries-grid");
const searchInput = document.querySelector("input");
const countryDetails = document.querySelector(".country-details");
const selectFilter = document.querySelector("select");
const countryDetailsContainer = document.querySelector(".details-container");
const filterSearchContainer = document.querySelector(".filter-search");
const toggleBtn = document.querySelector(".theme");

// Dark light mode theme toggle

toggleBtn.addEventListener("click", () => {
  console.log("click");
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    toggleBtn.innerHTML = `<p class="theme"><i class="fa-regular fa-moon"></i>LightMode</p>`;
  } else {
    toggleBtn.innerHTML = `<p class="theme"><i class="fa-regular fa-moon"></i>DarkMode</p>`;
  }
});

// Append data to html
countries.forEach((country) => {
  const countryCard = document.createElement("div");
  countryCard.className = "country-card";
  countryCard.innerHTML = `
        <div class="flag-container">
                <img src="${country.flags.png}"/>
        </div>
        <h3 class="country-name">
        ${country.name}
        </h3>
        <div class="description">
                <p>Population: <span>${country.population}</span></p>
                <p>Region: <span>${country.region}</span></p>
                <p>Capital: <span>${country.capital}</span></p>
        </div>
        `;
  countriesGrid.append(countryCard);
  countryCard.addEventListener("click", () =>
    showCountryDetails(countries, countryCard)
  );
});

function showCountryDetails(countries, card) {
  countries.forEach((country) => {
    console.log(card.querySelector(".country-name").textContent.toLowerCase());
    if (
      country.name.toLowerCase() ===
      card.querySelector(".country-name").textContent.toLowerCase().trim()
    ) {
      console.log(countries);

      countriesGrid.style.display = "none";
      filterSearchContainer.style.display = "none";
      countryDetails.style.display = "flex";

      //     Set the content of the details container
      countryDetailsContainer.innerHTML = `
              <img src="${country.flags.svg}"/>
        
         
              <div class="details-box">
                <h1 class="country-name">${country.name}</h1>
                <div class="properties">
                 <ul class="details-list">
                    <li>Native name: <span>${country.nativeName}</span></li> 
                    <li>Population:<span>
                    ${country.population}</span></li>
                    <li>Region: <span>
                    ${country.region}</span></li>
                    <li>Sub Region: <span>${country.subregion}</span></li>
                    <li>Capital:<span>
                    ${country.capital}</span></li>
                 </ul>

                 <ul class="details-list">
                        <li>Top Level Domain: ${country.topLevelDomain[0]}</li>

                           ${country.currencies
                             .map((currency) => {
                               return `<li>Currencies: <span>
                               ${currency.name}</span></li>`;
                             })
                             .join("")}
                             <li>
                             Languages: 
                             <span>
                               ${country.languages
                                 .map((language) => {
                                   return `
                               ${language.name}`;
                                 })
                                 .join(",")}
                             </span>
                             
                             </li>
                         
                        
                 </ul>

                </div>

                <ul class=" border-countries">
                <span>Border countries:</span>
                <li class="borders"> ${
                  country.borders
                    ? country.borders
                        .map(
                          (border) => `<span class="border">${border}</span>`
                        )
                        .join("")
                    : `<span>None</span>`
                }</li>
                </ul>
               
               
              </div>
              `;
    }
  });
}

// Searching for countries

searchInput.addEventListener("input", () => {
  countriesGrid.innerHTML = ``;
  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });

  filteredCountries.forEach((country) => {
    countries.innerHTML = ``;

    const countryCard = document.createElement("div");
    countryCard.className = "country-card";
    countryCard.innerHTML = `   <div class="flag-container">
                <img src="${country.flags.png}"/>
        </div>
        <h3 class="country-name">
        ${country.name}
        </h3>
        <div class="description">
                <p>Population: <span>${country.population}</span></p>
                <p>Region: <span>${country.region}</span></p>
                <p>Capital: <span>${country.capital}</span></p>
        </div>`;
    countriesGrid.appendChild(countryCard);
    countryCard.addEventListener("click", () =>
      showCountryDetails(filteredCountries, countryCard)
    );
  });

  if (filteredCountries.length === 0) {
    countriesGrid.innerHTML = `<h1 class="not-found">Not found</h1>`;
  }
});

// Filtering by region

selectFilter.addEventListener("change", () => {
  countriesGrid.innerHTML = ``;

  const filteredCountries = countries.filter((country) => {
    return country.region
      .toLowerCase()
      .includes(selectFilter.value.toLowerCase());
  });

  filteredCountries.forEach((country) => {
    countries.innerHTML = ``;
    const countryCard = document.createElement("div");
    countryCard.className = "country-card";
    countryCard.innerHTML = `
        <div class="flag-container">
                <img src="${country.flags.png}"/>
        </div>
        <h3 class="country-name">
        ${country.name}
        </h3>
        <div class="description">
                <p>Population: <span>${country.population}</span></p>
                <p>Region: <span>${country.region}</span></p>
                <p>Capital: <span>${country.capital}</span></p>
        </div>
`;
    countriesGrid.appendChild(countryCard);

    countryCard.addEventListener("click", () =>
      showCountryDetails(filteredCountries, countryCard)
    );
  });
});

const backBtn = document.querySelector(".back-btn");
backBtn.addEventListener("click", () => {
  countriesGrid.style.display = "grid";
  filterSearchContainer.style.display = "flex";
  countryDetails.style.display = "none";
});
