const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const resultDiv = document.getElementById('result');

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    resultDiv.innerHTML = '';
    var dataFound = "";
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            for (const category in data) {
                if (data.hasOwnProperty(category)) {
                    data[category].forEach(item => {
                        if (item.name.toLowerCase().includes(input)) {
                            if (category == "countries") {
                                dataFound += `<h1>${item.name}</h1>`;
                            } else {
                                dataFound += `<h2>${item.name}</h2>`;
                                dataFound += `<img src="${item.imageUrl}" alt="hjh">`;
                                dataFound += `<p><strong>Description:</strong> ${item.description}</p>`;
                            }
                        }
                        if (category == "countries") {
                            item.cities.forEach(city => {
                                if (city.name.toLowerCase().includes(input)) {
                                    dataFound += `<h2>${city.name}</h2>`;
                                    dataFound += `<img src="${city.imageUrl}" alt="hjh">`;
                                    dataFound += `<p><strong>Description:</strong> ${city.description}</p>`;
                                }
                            });
                        }
                    });
                }
            }
            if (dataFound.length === 0) {
                dataFound = 'No Matching Results';
            }
            console.log('DataEnd:', dataFound);
            resultDiv.innerHTML = dataFound;
        })
        .catch(error => {
            console.error('Error:', error);
            dataFound = 'An error occurred while fetching data.';
            resultDiv.innerHTML = dataFound;
        });
}
btnSearch.addEventListener('click', searchCondition);

function resetSearch() {
    resultDiv.innerHTML = '';
    document.getElementById('conditionInput').value = '';
}

btnReset.addEventListener('click', resetSearch);