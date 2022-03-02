const {Mover} = require("./movers");
const {houseLegislativeDayQuery} = require("../mutations/mutations");
const {houseLegislativeDaySql} = require("../mutations/sqlstatements");
const {senateLegislativeDayQuery} = require("../mutations/mutations");
const {senateLegislativeDaySql} = require("../mutations/sqlstatements");

class LegislativeDayMover extends Mover {

    constructor(branch) {
        if(branch === "HOUSE") {
            super(houseLegislativeDayQuery, houseLegislativeDaySql);
        } else {
            super(senateLegislativeDayQuery, senateLegislativeDaySql);
        }
    }

    cleanMySQLData() {
        const insertArray = new Array();
        console.log(this.sourceData)
        this.sourceData.nodes.forEach(element => {
            const startDate = new Date(element.startDate);
            const endDate = element.endDate? new Date(element.endDate) : null;
            this.cleanData.push([
                element.session.id,
                element.day,
                element.session.name,
                startDate.toISOString().slice(0, 10),
                startDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                endDate? endDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : null
            ])   
        });
        console.log("Legislative Day Data Cleaned: ", this.cleanData);
    }
    
}
module.exports = { 
    LegislativeDayMover:LegislativeDayMover 
}