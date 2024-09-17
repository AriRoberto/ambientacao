const axios = require('axios');

const apiIdean = () => {

    return {
        getSistemas: async () => {

            const resp = await axios.get('https://sesen-hom.camara.gov.br:443/integraidea-api/sistemas');

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
