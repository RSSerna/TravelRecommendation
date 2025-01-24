const btnSearch = document.getElementById('btnSearch');

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const country = data.countries.find(item => item.name.toLowerCase() === input);
            if (country) {
                resultDiv.innerHTML += `<h1>${country.name}</h1>`;
                country.cities.forEach(city => {
                    resultDiv.innerHTML += `<h2>${city.name}</h2>`;
                    resultDiv.innerHTML += `<img src="./img/${city.imageUrl}" alt="hjh">`;
                    resultDiv.innerHTML += `<p><strong>Description:</strong> ${city.description}</p>`;
                });
                return;
            } else {
                country.cities.forEach(city => {
                    resultDiv.innerHTML += `<h2>${city.name}</h2>`;
                    resultDiv.innerHTML += `<img src="./img/${city.imageUrl}" alt="hjh">`;
                    resultDiv.innerHTML += `<p><strong>Description:</strong> ${city.description}</p>`;
                });
                resultDiv.innerHTML = 'Info not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
btnSearch.addEventListener('click', searchCondition);