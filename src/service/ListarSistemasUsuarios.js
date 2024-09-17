var apiIdean = require("../api/idean/getSistemasUsuarios");

apiIdean.getSistemasUsuarios('P_991310')
.then(result => console.log(result))