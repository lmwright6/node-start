const api = require("./data-access/linx");
const mysqlDB = require("./data-access/alison");
const legislativeDayRef = require("./movers/legislativeDayRef");


async function moveAllData(){

    legislativeDayRef.moveLegislativeDayData();

}


moveAllData()
