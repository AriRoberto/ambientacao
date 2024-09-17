const axios = require('axios');

const apiIdean = (term) => {

    return {
      getSistemasSiglas: async (term) => {

        const resp = await axios.get('https://sesen-hom.camara.gov.br:443/integraidea-api/sistemas/siglas?term='+term);

            // Testa se a consulta retornou algum registro
            const sistemasSiglas = [];
            if (resp.status == 200) {
                resp.data.forEach((item) => {
                    sistemasSiglas.push(item);
                });
            }
            return sistemasSiglas;
        }
    }
}

module.exports = apiIdean();
