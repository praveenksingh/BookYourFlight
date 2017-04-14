global.apiPath = process.env.QPX_API_PATH;
global.key1 = process.env.GOOGLE_KEY_PLACES;
var key = process.env.GOOGLE_KEY_FLIGHT;
apiPath = apiPath.replace("API_KEY", key);

global.request = require('request');