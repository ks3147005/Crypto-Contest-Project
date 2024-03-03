let inputData = [];
const Api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
const table = document.getElementById('crypto-data');
const search = document.getElementById('search');
const sortByMktCap = document.getElementById('sortByMkt');
const sortByPercentage = document.getElementById('sortByPer');
const data = document.getElementById('data'); 

// Function to fetch data
async function fetchedCryptoData() {
    try {
        data.style.display = "block";
        const response = await fetch(Api);
        inputData = await response.json();
        getData(data);
        addEventListeners(); // Add event listeners after data is fetched
    } catch (e) {
        alert(e);
    } finally {
        inputData.style.display = "none"; // Hiding data after data is fetched
    }
}

// Function to display data in the table
function getData(data) {
    // Clear existing table rows
    table.innerHTML = '';

    // Iterate over data and create table rows
    for (let i = 0; i < inputData.length; i++) {
        const tr = document.createElement('tr');
        const twenty24HrChange = inputData[i].price_change_percentage_24h;
        const percentage = twenty24HrChange <= 0 ? "negative" : "positive";
        tr.innerHTML = `
            <td><img src="${inputData[i].image}" alt=""> ${inputData[i].id}</td>
            <td>${inputData[i].symbol}</td>
            <td>${inputData[i].current_price}</td>
            <td>${inputData[i].total_volume}</td>
            <td class="${percentage}">${twenty24HrChange}</td>
            <td>Mkt Cap: ${inputData[i].market_cap}</td>
        `;
        table.appendChild(tr);
    }
}

// Function to add event listeners
function addEventListeners() {
    // Event listener for sorting by market cap
    sortByMktCap.addEventListener('click', () => {
        const sortedByMktCap = inputData.sort((a, b) => b.market_cap - a.market_cap);
        getData(sortedByMktCap);
    });

    // Event listener for sorting by percentage change
    sortByPercentage.addEventListener('click', () => {
        const sortedByPercentage = inputData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        getData(sortedByPercentage);
    });

    // Event listener for search
    search.addEventListener('keyup', () => {
        const searchItem = search.value.toLowerCase();
        const filteredData = inputData.filter(item => {
            const itemName = item.name.toLowerCase();
            const itemSymbol = item.symbol.toLowerCase();
            return itemName.includes(searchItem) || itemSymbol.includes(searchItem);
        });
        getData(filteredData);
    });
}

// Call fetchedData function to fetch and display initial data
fetchedCryptoData();
 