const axios = require('axios');

const apiIdean = (ponto) => {

    return {
      getSistemasUsuarios: async (ponto) => {

        const resp = await axios.get('https://sesen-hom.camara.gov.br:443/integraidea-api/sistemas/usuarios/'+ponto+'/');

            // Testa se a consulta retornou algum registro
            const sistemas = [];
            if (resp.status == 200) {
                resp.data.forEach((item) => {
                    sistemas.push(item);
                });
            }
            return sistemas;
        }
    }
}

module.exports = apiIdean();
