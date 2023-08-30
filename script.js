const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsList = document.getElementById('resultsList');
const resultCount = document.getElementById('resultCount');
const historyList = document.getElementById('historyList');
let searchHistory = [];

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    searchCountry(searchTerm);
  }
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchButton.click();
  }
});

function searchCountry(term) {
  fetch(`https://restcountries.com/v3.1/name/${term}`)
    .then(response => response.json())
    .then(data => {
      updateResults(data);
      updateHistory(term);
    })
    .catch(error => console.error(error));
}

function updateResults(data) {
  resultsList.innerHTML = '';
  resultCount.textContent = data.length;

  data.forEach(country => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${country.flags[0]}" alt="${country.name.common}">
      <span>${country.name.common}</span>
      <button class="detailsButton">Mas Informacion</button>
    `;
    listItem.querySelector('.detailsButton').addEventListener('click', () => {
      showDetails(country);
    });
    resultsList.appendChild(listItem);
  });
}

function showDetails(country) {
  // Customize the information you want to display in the details view
  alert(`Pais: ${country.name.common}\nCapital: ${country.capital}\nPoblacion: ${country.population}`);
}

function updateHistory(term) {
  if (!searchHistory.includes(term)) {
    searchHistory.push(term);
    const historyItem = document.createElement('li');
    historyItem.textContent = term;
    historyItem.addEventListener('click', () => {
      searchInput.value = term;
      searchCountry(term);
    });
    historyList.appendChild(historyItem);
  }
}
