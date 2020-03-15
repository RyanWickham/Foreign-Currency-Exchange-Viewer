document.addEventListener('DOMContentLoaded', function(event) {
    //Get data list of curriencies and set them into the dropboxes
    makeAPICall(loadDataOnIndexPage, 'latest', '');

    //set function to the 'switchCurrencyButton'
    document.getElementById("switchCurrencyButton").addEventListener("click", function(event){
        event.preventDefault();
        switchMenuSelectedValues();
    });

    //Set function for the 'currencyConvertButton'
    document.getElementById("currencyConvertButton").addEventListener("click", function(event){
        event.preventDefault();
        let from = document.getElementById('FromSelectMenu').value;
        let to = document.getElementById('ToSelectMenu').value;

        getSelectedConversionRate(baseCurrency=from, comparedCurrency=to, callBackFunction=displayCurrecyConertedData)
    });
});

function loadDataOnIndexPage(xttp){
    let response = JSON.parse(xttp.response);

    let currencyList = createCurrencyListFromResponse(response);

    //Puts the currencyList into drop down menus
    let fromMenu = document.getElementById('FromSelectMenu');
    inputDataIntoDropdownMenus(fromMenu, currencyList);
    let toMenu = document.getElementById('ToSelectMenu');
    inputDataIntoDropdownMenus(toMenu, currencyList);

    //Sets default values to AUD -> USD
    fromMenu.value = 'AUD';
    toMenu.value = 'USD';
}

function createCurrencyListFromResponse(response){
    let list = [];

    for(currency in response.rates){
        list.push(currency);
    };

    return list;
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

function switchMenuSelectedValues(){
    let fromMenu = document.getElementById('FromSelectMenu');
    let toMenu = document.getElementById('ToSelectMenu');

    let temp = fromMenu.value;
    fromMenu.value = toMenu.value;
    toMenu.value = temp;
}

function displayCurrecyConertedData(xttp){
    let fromAmount = document.getElementById("AmountInput").value;
    let fromCurrency = document.getElementById("FromSelectMenu").value;
    let toCurrency = document.getElementById("ToSelectMenu").value;

    let toAmount = calculateConvertedAmount(xttp, fromAmount, toCurrency);

    let displayText = fromAmount + " " + fromCurrency + " = " + toAmount + " " + toCurrency;

    document.getElementById("convertedCurrencyDisplay").innerText = displayText;
}

function calculateConvertedAmount(xttp, fromAmount, currency){
    let rate = JSON.parse(xttp.response).rates[currency];
    return (fromAmount * rate).toFixed(2);
}