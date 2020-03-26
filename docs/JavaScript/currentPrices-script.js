let currencyList;

document.addEventListener('DOMContentLoaded', function(event) {
    //set default base currency as AUD    
    document.getElementById('BaseCurrencySelectMenu').value = 'AUD';

    //Get data list of curriencies and their prices, then set them on the page
    getLatestRates(baseCurrency = 'AUD', callBackFunction = loadDataOnCurrentPrices);

    //Set function for CurrencyUpdateButton
    document.getElementById("CurrencyUpdateButton").addEventListener("click", function(event){
        event.preventDefault();
        //clear current data on page so there isnt dulpicate data
        clearOldData();

        let base = document.getElementById('BaseCurrencySelectMenu').value;

        getLatestRates(baseCurrency = base, callBackFunction = loadDataOnCurrentPrices);
    });
});

function loadDataOnCurrentPrices(xttp){
    let response = JSON.parse(xttp.response);
    let rates = response.rates;

    currencyList = createCurrencyListFromResponse(rates);
    currencyList.sort();

    loadDataIntoBaseCurrencySelector();
    loadDataIntoColumns(rates);
}

function createCurrencyListFromResponse(rates){
    let list = [];

    for(currency in rates){
        list.push(currency);
    };

    return list;
}

function loadDataIntoColumns(rates){
    let list = getCurrencyListWithoutBaseCurrency();

    //Seprate data to be place into left and right columns
    let leftColumnData = list.slice(0, list.length/2);
    let rightColumnData = list.slice(list.length/2, list.length);

    //Place the data onto the page
    let leftColumn = document.getElementById('LeftColumn');
    let rightColumn = document.getElementById('RightColumn');

    inputDataIntoColoumn(leftColumn, leftColumnData, rates);
    inputDataIntoColoumn(rightColumn, rightColumnData, rates);
}

function getCurrencyListWithoutBaseCurrency(){
    let list = [];

    let base = document.getElementById('BaseCurrencySelectMenu').value;

    for(index in currencyList){
        if(currencyList[index] != base){
            list.push(currencyList[index]);
        }
    };

    return list;
}

function inputDataIntoColoumn(column, data, rates){
    for(index in data){
        let currency = data[index];

        //create container for the row
        let rowContainer = document.createElement("div");

        //create child elements
        let currencName = document.createElement('div');
        currencName.innerText = currency;
        let amount = document.createElement('div');
        amount.innerText = rates[currency];

        //Adding the respective classes to the elements
        rowContainer.classList.add('row','currency-info','mb-1','border-bottom');
        currencName.classList.add('col-4','offset-2','currency-name');
        amount.classList.add('col-4','currency-amount');

        //append child elements to parent
        rowContainer.appendChild(currencName);
        rowContainer.appendChild(amount);

        column.appendChild(rowContainer);
    }
}

function loadDataIntoBaseCurrencySelector(){
    let menu = document.getElementById('BaseCurrencySelectMenu');

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

function clearOldData(){
    let leftColumn = document.getElementById('LeftColumn');
    let rightColumn = document.getElementById('RightColumn');

    while(leftColumn.childElementCount>1){
        leftColumn.removeChild(leftColumn.childNodes[2]);
    }

    while(rightColumn.childElementCount>1){
        rightColumn.removeChild(rightColumn.childNodes[2]);
    }
}