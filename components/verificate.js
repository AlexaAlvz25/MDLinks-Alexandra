const axios = require('axios');



//function that makes request HTTP
function checkHttp(data) {
  data.forEach( (obj) => {
    axios
    .get(obj.href)
    .then((result) => {
      obj.statusCode = result.status;
      obj.statusText = result.statusText;
      return obj
    })
    .catch((err) => console.log(err));
  })
}
