const api = require("../data-access/linx");
const mysqlDB = require("../data-access/alison");


//move legislative day data 
async function moveLegislativeDayData() {
    //get IRC key
    const key = await api.getKey();

    //query IRC api
    const houseData = await getLinxData(key, "HOUSE");
    const senateData = await getLinxData(key, "SENATE");

    const cleanHouseData = cleanMySQLData(houseData);
    const cleanSenateData = cleanMySQLData(senateData);
    //upsert house data
    upsertData(cleanHouseData, true);
    upsertData(cleanSenateData, false);
}

async function getLinxData(key, branch){
    const query = `{
        matters {
            legislativeDays (where: {legislativeBranch:${branch}} order_by: {day:ASC}) {
                nodes {
                    id
            session{id name}
                    day
                    legislativeBranch
            startDate
                    endDate
                }
            }
        }
    }
    `
    const data = await api.getData(query, key);
    console.log("Legislative Day Data Recieved")
    return data;
}

function cleanMySQLData(data) {
    const insertArray = new Array();
    data.nodes.forEach(element => {
        const startDate = new Date(element.startDate);
        const endDate = element.endDate? new Date(element.endDate) : null;
        insertArray.push([
            element.session.id,
            element.day,
            element.session.name,
            startDate.toISOString().slice(0, 10),
            startDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
            endDate? endDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : null
        ])   
    });
    console.log("Legislative Day Data Cleaned: ", insertArray.length);
    return insertArray;
}

function upsertData(data, house) {
    let houseSql = "INSERT INTO `alison-etl`.`LINX-LegislativeDayRef-test` (SessionOid, LegislativeDay, SessionType, CalendarDate, HouseConveneTime, HouseAdjournTime) VALUES ? ON DUPLICATE KEY UPDATE HouseConveneTime=VALUES(HouseConveneTime), HouseAdjournTime=VALUES(HouseAdjournTime);";
    let senateSql = "INSERT INTO `alison-etl`.`LINX-LegislativeDayRef-test` (SessionOid, LegislativeDay, SessionType, CalendarDate, SenateConveneTime, SenateAdjournTime) VALUES ? ON DUPLICATE KEY UPDATE SenateConveneTime=VALUES(SenateConveneTime), SenateAdjournTime=VALUES(SenateAdjournTime);";

    mysqlDB.pool.query(
        house? houseSql : senateSql,
        [data],
        (error, results, fields) => {
            if (error) throw error;
            else console.log("Legislative Day Data Inserted")
    });
  }

module.exports = { moveLegislativeDayData };