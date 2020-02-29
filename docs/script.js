function makeAPICall(onReadyStateChangeFunction, endPoint, params){
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            onReadyStateChangeFunction(xhttp);
        }
    };

    let URL = "https://api.exchangeratesapi.io/" + endPoint + "?" + params;

    xhttp.open("Get", URL, true)
    xhttp.send();
}

//Gets the current exchange rates compared to the based rate
function getLatestRates(){
    let baseCurrency = "USD";
    let params = "base="+baseCurrency;

    makeAPICall(displayLatestRates, "latest", params);
}
function displayLatestRates(xhttp){
    console.log(xhttp.response)
}

//Gets the history of a certain currency over a period of time
function getHistoryOfRate(){
    let startAt = "2018-01-01";
    let endAt = "2018-01-10";
    let symbols = "AUD";

    let params = "start_at=" + startAt + "&end_at=" + endAt + "&symbols=" + symbols;

    makeAPICall(displayHistoryOfRate, "history", params)
}
function displayHistoryOfRate(xhttp){
    console.log(xhttp.response)
}

//Gets the conversion rate for the selection base currency => compared currency
function getSelectedConversionRate(){
    let baseCurrency = "USD";
    let comparedCurrency = "AUD";

    let params =  "base=" +baseCurrency + "&symbols=" + comparedCurrency;

    makeAPICall(displaySelectedConversionRate, "latest", params)
}
function displaySelectedConversionRate(xhttp){
    console.log(xhttp.response)
}