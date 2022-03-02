const {Mover} = require("./movers");
const {sessionQuery} = require("../queries/sourceMutations");
const {sessionSql} = require("../queries/destinationSqlStatments");

class SessionMover extends Mover {

    constructor() {
            super(sessionQuery, sessionSql);
    }

    cleanMySQLData() {

        this.sourceData.legislature.sessions.map((element) => {
            element.termName = element.term.name;
            delete element.term
            // TO DO validate this logic is correct
            if(element.status === "CLOSED") element.status="N";
            else element.status="Y"
            this.cleanData.push(Object.values(element));
        })
        console.log("Session Data Cleaned");
    }
    
}
module.exports = { 
    SessionMover:SessionMover 
}