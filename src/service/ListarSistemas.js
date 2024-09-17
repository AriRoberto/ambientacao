var apiIdean = require("../api/idean/getSistemas");

module.exports = () => {
  const execute = async () => {
    const lstSistemas = await apiIdean.getSistemas();

    const sistemas = [];
    
    lstSistemas.forEach((item) => {
      //console.log(item.ideSistema);
      sistemas.push(item);
    });

    return sistemas;
  };

  return {
    execute,
  };
};
