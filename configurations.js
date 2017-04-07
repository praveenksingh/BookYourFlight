global.apiPath = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=API_KEY";
// global.key1 = process.env.GOOGLE_KEY ||"AIzaSyDKbf5xMjHgx2AxbT8XYiemow5DPfBEj0I";
global.key1 = process.env.GOOGLE_KEY_PLACES ||"AIzaSyBviYdw6Yqic5WxRZ21KjVgQqXOKMWG7GI";
var key = process.env.GOOGLE_KEY_FLIGHT ||"AIzaSyB0Qaqmq90cU-511qA7AterDFbNrMvUwtU";
apiPath = apiPath.replace("API_KEY", key);

global.request = require('request');