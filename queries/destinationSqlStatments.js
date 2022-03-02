const houseLegislativeDaySql = "INSERT INTO `alison-etl`.`LINX-LegislativeDayRef-test` (SessionOid, LegislativeDay, SessionType, CalendarDate, HouseConveneTime, HouseAdjournTime) VALUES ? ON DUPLICATE KEY UPDATE HouseConveneTime=VALUES(HouseConveneTime), HouseAdjournTime=VALUES(HouseAdjournTime);";
const senateLegislativeDaySql = "INSERT INTO `alison-etl`.`LINX-LegislativeDayRef-test` (SessionOid, LegislativeDay, SessionType, CalendarDate, SenateConveneTime, SenateAdjournTime) VALUES ? ON DUPLICATE KEY UPDATE SenateConveneTime=VALUES(SenateConveneTime), SenateAdjournTime=VALUES(SenateAdjournTime);";
const sessionSql = "INSERT INTO `alison-etl`.`LINXSession-test` (LinxId, LegislativeDays, Name, StartDate, EndDate, ActiveSession, TermName) VALUES ?;";

module.exports = {
    sessionSql:sessionSql,
    houseLegislativeDaySql: houseLegislativeDaySql,
    senateLegislativeDaySql: senateLegislativeDaySql
}