var apiIdean = require("../api/idean/getSistemasSiglas");

apiIdean.getSistemasSiglas('sivis')
.then(result => console.log(result))