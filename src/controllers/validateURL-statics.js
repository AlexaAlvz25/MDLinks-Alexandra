const axios = require('axios');

//function that gets the response of axios
module.exports = (array) => {
  let newArray = [...array[0], ...array[1]];
  return Promise.all(newArray.map(link => {
    return axios
      .get(link)
      .then((result) => {
        return {
          status: 'ok',
          url: result.config.url
        }
      })
      .catch( (err) => {
        return {
          status: 'broken',
          url: link
        }
      })
  }))
}