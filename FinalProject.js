let count = 0;

const data = {
    labels: [],
    datasets: []
  };

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Click on the boxes to view the graph data.'
      }
    }
  }
};

const Sector = {
"0000": "Total nonfarm",
"0500": "Total private",
"0600": "Goods-producing",
"0700": "Service-providing",
"0800": "Private service-providing",
"1000": "Mining and logging",
"2000": "Construction",
"3000": "Manufacturing",
"3100": "Durable Goods",
"3200": "Nondurable Goods",
"4000": "Trade, transportation, and utilities",
"4142": "Wholesale trade",
"4200": "Retail trade",
"4300": "Transportation and warehousing",
"4422": "Utilities",
"5000": "Information",
"5500": "Financial activities",
"6000": "Professional and business services",
"6500": "Education and health services",
"7000": "Leisure and hospitality",
"8000": "Other services",
"9000": "Government"
};
let SectorKeys = Object.keys(Sector);


const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
  pink: 'rgb(255, 102, 178)',
  lightorange: 'rgb(255, 205, 139)',
  paleyellow: 'rgb(255, 243, 161)',
  lightgreen: 'rgb(182, 240, 187)',
  lightblue: 'rgb(153, 204, 255)',
  lightpurple: 'rgb(277, 202, 255)',
  lightgrey: 'rgb(192, 192, 192)',
  brown: 'rgb(102, 51, 0)',
  neongreen: 'rgb(0, 255, 0)',
  hotpink: 'rgb(255, 0, 127)',
  sagegreen: 'rgb(130, 176, 133)',
  mustard: 'rgb(213, 193, 14)',
  mauve: 'rgb(219, 160, 130)',
  navyblue: 'rgb(0, 0, 95)',
  maroon: 'rgb(102, 0, 51)'
};
let CHART_COLORS_KEYS = Object.keys(CHART_COLORS);
  
const CHART_COLORS_50_Percent = {
  red: 'rgba(255, 99, 132, 0.5)',
  orange: 'rgba(255, 159, 64, 0.5)',
  yellow: 'rgba(255, 205, 86, 0.5)',
  green: 'rgba(75, 192, 192, 0.5)',
  blue: 'rgba(54, 162, 235, 0.5)',
  purple: 'rgba(153, 102, 255, 0.5)',
  grey: 'rgba(201, 203, 207, 0.5)',
  pink: 'rgba(255, 102, 178, 0.5)',
  lightorange: 'rgba(255, 205, 139, 0.5)',
  paleyellow: 'rgba(255, 243, 161, 0.5)',
  lightgreen: 'rgba(182, 240, 187, 0.5)',
  lightblue: 'rgba(153, 204, 255, 0.5)',
  lightpurple: 'rgba(277, 202, 255, 0.5)',
  lightgrey: 'rgba(192, 192, 192, 0.5)',
  brown: 'rgba(102, 51, 0, 0.5)',
  neongreen: 'rgba(0, 255, 0, 0.5)',
  hotpink: 'rgba(255, 0, 127, 0.5)',
  sagegreen: 'rgba(130, 176, 133, 0.5)',
  mustard: 'rgba(213, 193, 14, 0.5)',
  mauve: 'rgba(219, 160, 130, 0.5)',
  navyblue: 'rgba(0, 0, 95, 0.5)',
  maroon: 'rgba(102, 0, 51, 0.5)'
};
let CHART_COLORS_50_Percent_KEY = Object.keys(CHART_COLORS_50_Percent);

let flag = false; 
function responseHandler() {
  if (this.status == 200) {
    let dataArray = this.response.Results.series[0].data;
let seriesID = this.response.Results.series[0].seriesID;
  let sectorline = {
label: "",
data:[],
borderColor: "",
backgroundColor: "",
hidden:true
}
sectorline.label = (Sector[seriesID.substring(3,7)]);
sectorline.borderColor = (CHART_COLORS_KEYS[count]);
sectorline.backgroundColor = (CHART_COLORS_50_Percent_KEY[count]);
if(flag == false){
for (let i = dataArray.length -1; i >= 0; i--) { 
data.labels.push(dataArray[i].periodName + " " + dataArray[i].year);
flag = true; 
}}
for(let i = dataArray.length -1; i >= 0; i--) {
sectorline.data.push(dataArray[i].value); 

}

data.datasets.push(sectorline);
count++

  console.log(this.response);
  }else {
  console.log ("error");
  }
}

const myChart = new Chart(
  document.getElementById('myChart'),
    config);


for (i = 0; i < SectorKeys.length; i++){
let call = new XMLHttpRequest()
call.addEventListener("load", responseHandler);
let x = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
let z = "000001?registrationkey=b5c0f803ed8b483c940df8539c6c0283";
call.open("GET", x + SectorKeys[i] + z);
call.responseType = "json";
call.send();
}
