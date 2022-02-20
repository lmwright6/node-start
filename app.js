const api = require("./DataAccess/linx");

async function test(){
    const key = await api.getKey();
    const query = `{
        matters {
            legislativeDays {
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
    }`
    api.getData(query, key);
}

test();