let currencyList;

document.addEventListener('DOMContentLoaded', function(event) {
    //Cureate the currencyList
    createCurrencyList();

    //Get data of curriencies and display them on the page
    getHistoryOfRate(startAt = '1999-01-01', endAt = '2020-03-26', basedCurrency = 'USD', symbols = 'AUD', callBackFunction = loadDataOnPriceOverTimePage);

    //Set function for the 'GenerateGraphButton'
    document.getElementById("GenerateGraphButton").addEventListener("click", function(event){
        event.preventDefault();
        let from = document.getElementById('FromSelectMenu').value;
        let to = document.getElementById('ToSelectMenu').value;

        getHistoryOfRate(startAt = '1999-01-01', endAt = '2020-03-26', basedCurrency = to, symbols = from, callBackFunction = loadDataOnPriceOverTimePage);
    });
});

async function createCurrencyList(){
    makeAPICall(createCurrencyListFromResponse, 'latest', '');
}

function loadDropdownMenusData(){
    let fromMenu = document.getElementById('FromSelectMenu');
    inputDataIntoDropdownMenus(fromMenu, currencyList);
    let toMenu = document.getElementById('ToSelectMenu');
    inputDataIntoDropdownMenus(toMenu, currencyList);

    //Sets default values to AUD -> USD
    fromMenu.value = 'AUD';
    toMenu.value = 'USD';
}

function inputDataIntoDropdownMenus(menu, currencyList){
    for(index in currencyList){
        // create new option element
        var opt = document.createElement('option');

        // create text node to add to option element (opt)
        opt.appendChild( document.createTextNode(currencyList[index]) );

        // set value property of opt
        opt.value = currencyList[index]; 

        // add opt to end of select box (sel)
        menu.appendChild(opt); 
    }
}

function loadDataOnPriceOverTimePage(xttp){
    let response = JSON.parse(xttp.response);

    //take data and make usable for graph
    let {xLables, yData } = prepareDataForPage(response.rates);
    createGraph(xLables, yData);
}

function createCurrencyListFromResponse(xttp){
    let response = JSON.parse(xttp.response);

    let list = [];

    for(currency in response.rates){
        list.push(currency);
    };

    currencyList = list;
    loadDropdownMenusData()
}

function prepareDataForPage(currentRates){
    let data = currentRates;
    let selectedData = [];

    for(index in data){
        //index is displayed as yyyy-mm-dd
        let date = index.split('-');

        //Only take Jan 2nd of each year
        if(date[1] == '01' && date[2] == '02'){
            let price = data[index]['AUD'];
            selectedData.push([date[0], price]); //[x lables, y data]
        }
    }

    //Make the data in order olderest->newest
    selectedData.sort((a,b) => a[0]-b[0])

    //decompose selectedData into x and y components
    let xLables = [];
    let yData = [];
    
    for(index in selectedData){
        xLables.push(selectedData[index][0]);
        yData.push(selectedData[index][1])
    }

    return {xLables, yData};
}


//Sets up the graph with Graph.js
function createGraph(xLables, yData){
    let baseCurrency = document.getElementById('FromSelectMenu').value;
    let comparedCurrency = document.getElementById('ToSelectMenu').value;
    let graphLable = `${baseCurrency} Compared To ${comparedCurrency} Over Time`;

    const ctx = document.getElementById('pricesGraph').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xLables,
            datasets: [{
                label: graphLable,
                data: yData,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false
        }
    });
}