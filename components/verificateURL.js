const axios = require('axios');

//function that gets the response of axios
module.exports = (data) => {
  return Promise.all(data.map( (objLink) => {
    //function that makes request HTTP
    return axios
      .get(objLink.href)
      .then( (result) => {
        return {
          ...objLink,
          statusCode : result.status,
          statusText : result.statusText,
        }
      })
      .catch( (err) => {
        if(err.response) {
          return {
            ...objLink,
            statusCode : err.response.status,
            statusText : err.response.statusText,
          }
        } else if (err.request) {
          return {
            ...objLink,
            statusText : 'This site can’t be reached - Server IP address could not be found',
          }
        }
      })
  }));
}
