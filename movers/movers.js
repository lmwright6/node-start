const mysqlDB = require("../data-access/alison");
const api = require("../data-access/linx");

class Mover {
    sourceData;
    cleanData = [];
    constructor(sourceMutation, destinationInsert ) {
        this.sourceMutation = sourceMutation;
        this.destinationInsert = destinationInsert;
    }

    async getSourceData(key){
        this.sourceData = await api.getData(this.sourceMutation, key);
    }
    
    async addDestinationData() {
        mysqlDB.pool.query(
            this.destinationInsert,
            [this.cleanData],
            (error, results, fields) => {
                if (error) throw error;
                else console.log("Legislative Day Data Inserted")
        });
    }
    toString() {
        return `source mutation: ${this.sourceMutation} \n destination insert: ${this.destinationInsert}`
    }

    
}

module.exports = { 
    Mover:Mover 
}