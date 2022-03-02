const { gql } = require("graphql-request")


const houseLegislativeDayQuery = gql`{
    matters {
        legislativeDays (where: {legislativeBranch:HOUSE} order_by: {day:ASC}) {
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
const senateLegislativeDayQuery = gql`{
    matters {
        legislativeDays (where: {legislativeBranch:SENATE} order_by: {day:ASC}) {
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

module.exports = {
    houseLegislativeDayQuery:houseLegislativeDayQuery,
    senateLegislativeDayQuery:senateLegislativeDayQuery
}