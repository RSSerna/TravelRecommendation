const btnSearch = document.getElementById('btnSearch');
const resultDiv = document.getElementById('result');

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            var dataFound = "";
            for (const category in data) {
                if (data.hasOwnProperty(category)) {
                    data[category].forEach(item => {
                        if (item.name.toLowerCase().includes(input)) {
                            if (category == "countries") {
                                dataFound += `<h1>${item.name}</h1>`;
                            } else {
                                dataFound += `<h2>${item.name}</h2>`;
                                dataFound += `<img src="./img/${item.imageUrl}" alt="hjh">`;
                                dataFound += `<p><strong>Description:</strong> ${item.description}</p>`;
                            }
                        }
                        if (category == "countries") {
                            item.cities.forEach(city => {
                                if (city.name.toLowerCase().includes(input)) {
                                    dataFound += `<h2>${city.name}</h2>`;
                                    dataFound += `<img src="./img/${city.imageUrl}" alt="hjh">`;
                                    dataFound += `<p><strong>Description:</strong> ${city.description}</p>`;
                                }
                            });
                        }
                    });
                }
            }
            if (str.length === 0) {
                dataFound = 'No Matching Results';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            dataFound = 'An error occurred while fetching data.';
        });
    resultDiv.innerHTML = dataFound;
}
btnSearch.addEventListener('click', searchCondition);