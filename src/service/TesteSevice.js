var apiIdeanU = require("../api/idean/getSistemasUsuarios");
var apiIdeanS = require("../api/idean/getSistemasSiglas");

apiIdeanU.getSistemasUsuarios('P_991310')
.then(result => console.log(result))

apiIdeanS.getSistemasSiglas('sivis')
.then(result => console.log(result))