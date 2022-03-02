const { gql } = require("graphql-request")


const sessionQuery = gql `{
    legislature {
      sessions {      
        id
        legislativeDays
        name
        startDate
        endDate
        term{name}
        status
      }
    }
  }`

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
    sessionQuery:sessionQuery,
    houseLegislativeDayQuery:houseLegislativeDayQuery,
    senateLegislativeDayQuery:senateLegislativeDayQuery
}