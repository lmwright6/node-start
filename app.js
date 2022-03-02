const api = require("./data-access/linx");
const {LegislativeDayMover} = require("./movers/legislativeDayMover");
const {SessionMover} = require("./movers/sessionMover");




async function moveAllData(){
    const key = await api.getKey();
    const movers = []
    // movers.push(new LegislativeDayMover("HOUSE"));
    // movers.push(new LegislativeDayMover("SENATE"));
    movers.push(new SessionMover());

   movers.map((obj) => {
    moveLegislativeDayData(key, obj);
   })

}
async function moveLegislativeDayData(key, obj) {
    await obj.getSourceData(key);
    obj.cleanMySQLData();
    console.log("CLEAN DATA", obj.cleanData)
    await obj.addDestinationData();
}


moveAllData()
