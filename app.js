const api = require("./data-access/linx");
const {LegislativeDayMover} = require("./movers/legislativeDayMover");



async function moveAllData(){
    const key = await api.getKey();
    const movers = []
    movers.push(new LegislativeDayMover("HOUSE"));
    movers.push(new LegislativeDayMover("SENATE"));

   movers.map((obj) => {
    moveLegislativeDayData(key, obj);
   })

}
async function moveLegislativeDayData(key, obj) {
    await obj.getSourceData(key);
    obj.cleanMySQLData();
    await obj.addDestinationData();
}


moveAllData()
