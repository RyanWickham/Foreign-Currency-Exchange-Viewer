function makeAPICall(onReadyStateChangeFunction, endPoint, params){
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            onReadyStateChangeFunction(xhttp);
        }
        if(this.status == 400){
            alert('There is no data available for this pairing of curriencies, try a different combination.')
        }
    };

    let URL = "https://api.exchangeratesapi.io/" + endPoint + "?" + params;

    xhttp.open("Get", URL, true)
    xhttp.send();
};

//Gets the current exchange rates compared to the based rate
function getLatestRates(baseCurrency, callBackFunction){
    let params = "base="+baseCurrency;
    makeAPICall(callBackFunction, "latest", params);
};

//Gets the history of a certain currency over a period of time
//startAt/EndAt format is yyyy-mm-dd
function getHistoryOfRate(startAt, endAt, basedCurrency, symbols, callBackFunction){
    let params = "start_at=" + startAt + "&end_at=" + endAt + "&base=" + basedCurrency + "&symbols=" + symbols;
    makeAPICall(callBackFunction, "history", params)
};

//Gets the conversion rate for the selection base currency => compared currency
function getSelectedConversionRate(baseCurrency, comparedCurrency, callBackFunction){
    let params =  "base=" +baseCurrency + "&symbols=" + comparedCurrency;
    makeAPICall(callBackFunction, "latest", params)
};