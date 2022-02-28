const axios = require('axios')
const fs = require('fs');

require('dotenv').config();

const tokenUrl = process.env.tokenUrl;
const dataUrl = process.env.linxUrl;
//const pdfUrl = process.env.pdfUrl;
const params = new URLSearchParams();
params.append('grant_type', process.env.tokenGrantType);
params.append('client_id', process.env.tokenClientId);
params.append('username', process.env.tokenUsername);
params.append('password', process.env.tokenPassword);
params.append('response_type', process.env.tokenResponseType);

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
}

const dataConfig = {
    headers: {
        'session-scope': process.env.session
    }
}

function getKey(){
    return new Promise(async function(resolve, reject) {
        axios
            .post(tokenUrl, params, config).then(res => {
                //console.log(`key status code: ${res.status}`);
                resolve(res.data.access_token)
            })
            .catch(error => {
                console.error(error);
            })

    })
}

function getData(query, key){  
    return new Promise(async function(resolve, reject) {
        axios({
            url: dataUrl,
            method: 'post',
            headers: {
                ...dataConfig.headers,
                Authorization: 'Bearer ' + key
            },
            data: {
              query: query
            }
          }).then((result) => {
              resolve(result.data.data.matters.legislativeDays);
          }).catch((error) => {
              console.log(error);
          });

    })

}


module.exports = { getKey, getData };