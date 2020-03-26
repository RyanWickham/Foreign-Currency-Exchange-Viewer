//Used to cache the data
let currentRates;

document.addEventListener('DOMContentLoaded', function(event) {
    //Get data list of curriencies and set them into the dropboxes
    getHistoryOfRate(startAt = '1999-01-01', endAt = '2020-03-26', symbols = 'AUD', callBackFunction = loadDataOnPriceOverTimePage);

    
});

function loadDataOnPriceOverTimePage(xttp){
    let response = JSON.parse(xttp.response);

    //save for later use
    currentRates = response.rates;

    //take data and make usable for graph
    let {xLables, yData } = prepareDataForPage();
    createGraph(xLables, yData);
}

function prepareDataForPage(){
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
    const ctx = document.getElementById('pricesGraph').getContext('2d');
    
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xLables,
            datasets: [{
                label: '# of Votes',
                data: yData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false
        }
    });
}